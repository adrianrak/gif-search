var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'a1w4GjFRp4p16YJ0jF8iCTo75SMqCoBG';

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
            .then((response) => {
                const gif = {  // 5.
                    url: response.data.fixed_width_downsampled_url,
                    sourceUrl: response.data.url
                };
                this.setState({  // 4
                    loading: false,  // a
                    gif: gif,  // b
                    searchingText: searchingText  // c
                });
            })
            .catch(error => {
                console.log('error', error);
                this.setState({ loading: false });
            })
    },

    getGif: (searchingText) => {
        let url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        return fetch(url).then((response) => response.json());
    },
    
    render: function() {

        var styles = {
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

var app = React.createElement(App, {});
ReactDOM.render(app, document.getElementById('app'));