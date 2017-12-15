let GIPHY_API_URL = 'http://api.giphy.com';
let GIPHY_PUB_KEY = 'a1w4GjFRp4p16YJ0jF8iCTo75SMqCoBG';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) {  // 1.
        this.setState({
          loading: true  // 2.
        });
        this.getGif(searchingText)
            .then((gif) => {  // 3.
                this.setState({  // 4
                loading: false,  // a
                gif: gif,  // b
                 searchingText: searchingText  // c
                });
            }).bind(this);
    },

    getGif: function(searchingText) {
        return new Promise(
            function (resolve, reject) {
                let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
                const xhr = new XMLHttpRequest();  // 3.
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data; // 4.
                        const gif = {  // 5.
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                            };
                        resolve(gif);  // 6.
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
        });
    },
    
    render: function() {

        let styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});

const app = React.createElement(App, {});
ReactDOM.render(app, document.getElementById('app'));