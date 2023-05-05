import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import '../css/store.css';
import Footer from '../components/footer'

import { Helmet } from 'react-helmet';


class StorePage extends Component {

    constructor(props) {
        super(props);
        this.count = 1;
        this.images = [
            './image/store/change1.png',
            './image/store/change2.jpg',
            './image/store/change3.jpg',
            './image/store/change4.jpg',
            './image/store/change5.jpg',
        ];
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.countingTime.textContent = this.count;
            this.chPic.src = this.images[this.count - 1];
            this.count++;
            if (this.count > this.images.length) {
                this.count = 1;
            }
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }



    render() {
        return (
            <div>

                <Helmet>
                    <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
                </Helmet>

                <div className="firstP">
                    <div>
                        <p className="topicText">PRODUCT</p>
                    </div>
                    <div className="countdownContainer">
                        <div className="countingIcon">
                            <div className="countingNumber" ref={ref => (this.countingTime = ref)}>{this.count}</div>
                        </div>
                        <a href="http://localhost:3000/goods" rel="noreferrer">
                            <div className="changingImg">
                                <img className="chPic" src={this.images[0]} alt="輪播圖" ref={ref => (this.chPic = ref)} />
                            </div>
                        </a>
                        <a className="event" href="http://localhost:3000/goods" rel="noreferrer" target="_blank">餐盒方案特價中</a>
                    </div>
                </div>


                <br /><br /><br />
                <div className="goodsPge">
                    <span className="drinkgoodsPge">
                        <a className="a" href="http://localhost:3000/goods" rel="noreferrer" target="_blank">乳清蛋白</a>
                    </span>
                    <span className="dietgoodsPge">
                        <a className="b" href="http://localhost:3000/goods" rel="noreferrer" target="_blank">增肌減脂套餐</a>
                    </span>
                </div>

                <br /><br /><br /><br />
                <div className="mycontain">
                    <div className="selectS">
                        <span className="allGoods">
                            <p>全站商品</p>
                        </span>
                        <span className="goodsQty">
                            <p>共 <input className="howMuchGoods" type="text" placeholder="12" /> 件商品</p>
                        </span>
                        <span className="changegoodsWay">
                            <button id="cardLn" className="squareBtn" onClick={this.handleCardLnClick}><img className="squareImg" src="./image/store/changebtn1.png" alt="squarebtn" /></button>
                            <button id="cardBl" className="listBtn" onClick={this.handleCardBlClick}><img className="listImg" src="./image/store/changebtn2.webp" alt="listbtn" /></button>
                        </span>
                    </div>
                    <br />
                    <p id="top"></p>
                    <hr />
                </div>

                <div>
                    <a href="http://localhost:3000/goodstop" className="gotopBtn">
                        <div className="backGroup">
                            <div>
                                <img className="arrowImg" src="./image/store/backToTop.png" alt="箭頭" />
                            </div>
                            <span>TOP</span>
                        </div>
                    </a>
                </div>

                <br /><br /><br /><br />

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                        <div className="col-md-3">
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div className="mycardIcon">
                                    <img id="myCard" src="./image/store/good1.png" alt='商品大圖' />
                                    <span className="hiddenIcon">
                                        <div className="magnifierBlock">
                                            <img src="./image/store/ magnifier.png" alt='放大鏡' />
                                        </div>
                                    </span>
                                </div>
                            </a>

                            <br />
                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <div>
                                    <p className="fw-semibold cardTopic">紅酒燉牛肉烤蔬菜地瓜餐盒</p>
                                    <p className="cardText">
                                        紅酒燉牛肉：綜合牛腱,紅酒,洋蔥,紅蘿蔔,番茄碎,百里香,月桂葉,迷迭香,西洋芹,鹽,黑胡椒粉。<br />
                                        地中海堅果烤蔬菜＋地瓜：牛番茄,紫洋蔥,青花菜,玉米筍,綠橄欖,橄欖油,鹽,葵瓜子,地瓜。</p>
                                </div>
                            </a>

                            <a href="http://localhost:3000/goods" rel="noreferrer" target="_blank" className="whereUsergo">
                                <span className="cardSprice">NTD1200</span>
                                <span className="cardPrice">NTD1600</span>
                            </a>
                        </div>
                    </div>
                </div>


                <br /><br /><br /><br />

                <div className="nextPage">
                    <a href="http://localhost:3000/goods" rel="noreferrer" className="nextOne">1</a>
                    <a href="http://localhost:3000/goods" rel="noreferrer" className="nextTwo">2</a>
                    <a href="http://localhost:3000/goods" rel="noreferrer" className="nextThree">3</a>
                </div>

                <br /><br /><br /><br />

                <Footer/>

            </div>


        );
    }




    handleCardBlClick = () => {
        if ($(".cardColumn").length === 0) {
            $(".col-md-3").removeClass("col-md-3").addClass("col-md-12");
            $(".col-md-12").addClass("cardColumn");
        }
    }

    handleCardLnClick = () => {
        if ($(".cardColumn").length > 0) {
            $(".col-md-12").removeClass("col-md-12").addClass("col-md-3");
            $(".cardColumn").removeClass("cardColumn");
        }
    }

}

export default StorePage;