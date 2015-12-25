import React, {
    Component,
    View,
    NavigatorIOS,
    TouchableHighlight,
    Text,
    StyleSheet,
    TabBarIOS
} from 'react-native';

import Timeline from './Timeline';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

const urls = ['Timeline', 'Photos', 'People', 'Profile'];
class App extends Component {
    render () {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: Tabs,
                    title: 'Instagram'
                }}
                style={{flex: 1}}
                shadowHidden={false}
                barTintColor="#115687"
                titleTextColor="#fff"
                translucent={false} />
        );
    }
}

class Tabs extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selectedTab: {
                timeline: true
            },
            notifCount: 0,
            presses: 0
        };
    }

    _renderContent (color, pageText, num) {
        return (
          <View style={[styles.tabContent, {backgroundColor: color}]}>
            <Text style={styles.tabText}>{pageText}</Text>
            <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
          </View>
        );
    }

    render () {
        return (
            <TabBarIOS
                tintColor="white"
                barTintColor="#25272B">
                <TabBarIOS.Item
                    title="Timeline"
                    systemIcon="bookmarks"
                    selected={this.state.selectedTab.timeline}
                    onPress={() => {
                        this.setState({
                            selectedTab: {timeline: true}
                        });
                    }}>
                    <Timeline />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    systemIcon="search"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab.search}
                    onPress={() => {
                        this.setState({
                            selectedTab: {search: true}
                        });
                    }}>
                    {this._renderContent('#fff', 'Red Tab', this.state.notifCount)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Camera"
                    systemIcon="history"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab.camera}
                    onPress={() => {
                        this.setState({
                            selectedTab: {camera: true}
                        });
                    }}>
                    {this._renderContent('#fff', 'Red Tab', this.state.notifCount)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Likes"
                    systemIcon="recents"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab.likes}
                    onPress={() => {
                        this.setState({
                            selectedTab: {likes: true}
                        });
                    }}>
                    {this._renderContent('#fff', 'Red Tab', this.state.notifCount)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Profile"
                    systemIcon="contacts"
                    selected={this.state.selectedTab.profile}
                    onPress={() => {
                        this.setState({
                            selectedTab: {profile: true}
                        });
                    }}>
                    {this._renderContent('#fff', 'Green Tab', this.state.presses)}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

// {<View>}
    // <NavigatorIOS
        // initialRoute={{
            // title: 'React Native Instagram App',
            // component: Timeline
        // }} />
    // {<View>
        // {urls.map((item, index) => {
        //     return (
        //         <TouchableHighlight
        //             key={index}
        //             onPress={this.goToRoute.bind(this, item)}>
        //             <Text>{item}</Text>
        //         </TouchableHighlight>
        //     );
        // })}
    // </View>}
// {/*</View>*/}

/*const App = ({routes, children}) => {
    return (
        <div>
            <header className="header">
                <ul className="menu g-clf">
                    {links}
                </ul>
            </header>
            <div className="main g-clf">
                {children}
            </div>
            <footer className="footer">
                <ul className="social">
                    <li className="social__item">
                        <a className="social__link icon-facebook" href="https://facebook.com/isnifee"></a>
                    </li>
                    <li className="social__item">
                        <a className="social__link icon-twitter" href="https://twitter.com/isnifer"></a>
                    </li>
                    <li className="social__item">
                        <a className="social__link icon-VK" href="https://vk.com/isnifer"></a>
                    </li>
                    <li className="social__item">
                        <a className="social__link icon-GitHub-circle" href="https://github.com/isnifer"></a>
                    </li>
                </ul>
                <div className="footer__copyright">
                    &copy; Anton Kuznetsov
                    <span className="footer__rights">
                        . Instagram App. All rights on left!
                    </span>
                </div>
            </footer>
        </div>
    );
}*/

export default App;
