import React from 'react';
import NavHeader from '../components/nav-header/NavHeader';
import {Link} from 'react-router-dom';
import "./problems.css"

class Problems extends React.Component {
    render() {
        return (
            <div id={"problems"}>
                <div className={"main-no-bottom"}>
                    <NavHeader backurl={"/"} title={"常见问题"} backquery={{pos: 2}}/>
                    {/*<h4 className={"problems__title"}>如下：</h4>*/}
                    <div>
                        <p className={"problems__para"}>1、网订未取入园票的游客可通过阿坝文旅票务预订网站：阿坝旅游网（http://www.abatour.com）办理退票；</p>
                        <p className={"problems__para"}>
                            2、网订已取入园票、现金和自助售票机购买8月9日入园票的游客凭当日景区入园票可在景区沟口售票厅、阿坝文旅（地址：成都市一环路西一段望仙场街一号百花商务楼三楼，咨询电话：400-088-6969转1）办理退票；</p>
                        <p className={"problems__para"}>
                            3、网订已取入园票、现金和自助售票机购买8月9日入园票已离开景区的游客可把当日入园票附银行卡号邮寄至：a、四川省阿坝州九寨沟县漳扎镇九寨沟管理局票务处；b、成都市青羊区金沙遗址路3号附201。联系电话：028-87364878，手机：13438822006，经核实无误后退回票款。
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Problems;