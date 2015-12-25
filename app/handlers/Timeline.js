import React, {
    Component,
    PropTypes,
    ListView,
    View,
    ScrollView,
    Image,
    Text
} from 'react-native';
import { connect } from '../../node_modules/react-redux/lib/index';

// Actions
import { getTimelineAction, updateTimelineAction } from '../actions/index';

const CommentsItem = ({src, author, text}) => {
    return (
        <View className="comments__item">
            <Image source={{uri: src}} className="comments__pic" />
            {/*<a className="comments__username" href="#/profile/">{author}</a>:&#160;*/}
            <Text>{author}</Text>
            <Text>:</Text>
            <Text className="comments__text">{text}</Text>
        </View>
    );
}

class TimelineUser extends Component {
    render () {
        const {userId, username, likes, liked} = this.props;
        const avatar = this.props.avatar.replace('.jpg', '.png');

        return (
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                flexDirection:'row',
                height: 100,
                padding: 18
            }}>
                {/*<a href={'#/profile/' + userId} className="user__pic">*/}
                <Image
                    style={{width: 64, height: 64, borderRadius: 32}}
                    source={{uri: avatar}} />
                {/*</a>*/}
                <Text style={{
                    fontSize: 20,
                    color: '#333',
                    marginBottom: 5,
                    alignSelf: 'center',
                    marginLeft: 18
                }}>
                    {username}
                </Text>
                {/*<LikeHeart likes={likes} liked={liked} />*/}
            </View>
        );
    }
}

// const LikeHeart = ({liked, likes}) => {
//     return (
//         <span className="user__likes">
//             <i className={liked ? 'user__like user__like_liked' : 'user__like'}></i>
//             <span className="user__likes-count">{likes}</span>
//         </span>
//     );
// }

class TimelinePhoto extends Component {
    render () {
        const src = this.props.src.replace('.jpg', '.png');
        return (
            <Image
                style={{width: 375, height: 375}}
                source={{uri: src}}
                resizeMode="contain" />
        );
    }
}

// const TimelineVideo = ({id, src}) => {
//     return (
//         <video className="photo__pic" id={id} controls>
//             <source src={src}></source>
//         </video>
//     );
// }

class TimelineItem extends Component {
    // const timelineElement = type === 'video' ?
    //     (<TimelineVideo
    //         src={element.videos.standard_resolution.url}
    //         id={id} />) :
    //     (<TimelinePhoto
    //         src={element.images.standard_resolution.url}
    //         id={id} liked={element.user_has_liked} />);

    // const comments = element.comments.data.map((comment, i) => {
    //     return (
    //         <CommentsItem
    //             src={comment.from.profile_picture}
    //             authorId={comment.from.id}
    //             author={comment.from.username}
    //             text={comment.text}
    //             key={i} />
    //     );
    // });
    //
    render () {
        const {element, id, type, user} = this.props;

        return (
            <View>
                <TimelineUser
                    liked={element.user_has_liked}
                    userId={user.id}
                    username={user.username}
                    avatar={user.profile_picture}
                    likes={element.likes.count}
                    photoId={element.id} />
                <TimelinePhoto src={element.images.standard_resolution.url} id={id} />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    }
};

class Timeline extends Component {
    constructor (props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.loadOnEnd = this.loadOnEnd.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getTimelineAction({}));
    }

    loadOnEnd () {
        this.props.dispatch(updateTimelineAction({
            url: this.props.model.pagination.next_url
        }));
    }

    render () {
        const renderRow = (picture, i) => {
            return (
                <TimelineItem
                    element={picture}
                    user={picture.user}
                    id={picture.id}
                    type={picture.type}
                    key={i} />
            );
        };
        const dataSource = this.ds.cloneWithRows(this.props.model.timelineItems);

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={dataSource}
                    renderRow={renderRow}
                    pageSize={20}
                    initialListSize={20}
                    onEndReached={this.loadOnEnd}
                />
            </View>
        );
    }
}

Timeline.propTypes = {
    model: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
    model: {
        timelineItems: state.timelineItems,
        pagination: state.timelinePagination,
        timelineLoaded: state.timelineLoaded
    }
}))(Timeline);
