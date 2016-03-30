import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const API_KEY = 'AIzaSyCTsgqVi5QIbTwv3yo4f6EfcCtkiLV86kk';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('blender cycles');
    }

    videoSearch(term) {
        YTSearch(
            {key: API_KEY, term},
            videos => this.setState({
                videos,
                selectedVideo: videos[0]
            })
        );
    }

    render() {

        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 500);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}


ReactDOM.render(
    <App />
    , document.getElementById('app'));

/*
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';
 import { createStore, applyMiddleware } from 'redux';

 import App from './components/app';
 import reducers from './reducers';

 const createStoreWithMiddleware = applyMiddleware()(createStore);

 ReactDOM.render(
 <Provider store={createStoreWithMiddleware(reducers)}>
 <App />
 </Provider>
 , document.querySelector('.container'));

 */
