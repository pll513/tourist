import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link} from 'react-router-dom';
import {BASE_URL} from '../config/network';
import './culture-detail.css';

class CultureDetail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cultureLoaded: false,
            culture: [],
        }
    }
    
    componentDidMount() {
        let {query} = this.props.location;
        let cultureId;
        if (query) {
            cultureId = query.culture_id;
        }
        console.log(cultureId);
        fetch(BASE_URL + '/article/' + cultureId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            return res.json().then((data) => {
                console.log(data);
                this.setState({
                    cultureLoaded: true,
                    culture: data,
                });
            })
        });
    }
    
    render() {
        let articleHtml = null;
        let {cultureLoaded, culture} = this.state;
        
        if (cultureLoaded) {
            articleHtml = culture.content.map((item)=> {
                if (~item.indexOf('photo:')) {
                    // 图片
                    let imgUrl = item.split(':')[1].trim();
                    return (
                        <img src={imgUrl} className={"article-img"} alt=""/>
                    );
                } else {
                    return (
                        <p className={"article-para"}>{item}</p>
                    );
                }
            });
        }
        return (
            <div id="culture-detail">
                <NavHeader backurl={"/culture"} title={"文化"}/>
                <div className={"main-no-bottom"}>
                    <h3 className={"article-title"}>{culture.name}</h3>
                    {articleHtml}
                </div>
            </div>
        );
    }
    
}

export default CultureDetail;