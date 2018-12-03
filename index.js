exports.single = {
    validate: {
        password: (content, minmum, maxmum) => {
            const arraysCH = ['低', '低', '中', '强', '密码不能小于8位并且不能大于16位!'];
            const arraysEN = ['low', 'low', 'middle', 'strong', 'byte'];
            const min = minmum || 8;
            const max = maxmum || 16;
            let ayIndex = 0;

            if (/[a-zA-Z]/.test(content))
                ayIndex++;
            if (/\d+/.test(content))
                ayIndex++;
            if (/[^0-9a-zA-Z]/.test(content))
                ayIndex++;
            if (content.length < min || content.length > max)
                ayIndex = 0 //ayIndex = 4;
            let Result = {
                state: arraysCH[ayIndex],
                status: arraysEN[ayIndex]
            }
            return Result;
        },
        cardid: (cardid) => {
            var certificateNo = cardid;
            if (certificateNo.length != 18) {
                return Result = {
                    state: "身份证号码无效，请使用第二代身份证！",
                    status: false
                };
            } else {
                var address = certificateNo.substring(0, 6); //6位，地区代码
                var birthday = certificateNo.substring(6, 14); //8位，出生日期                 
                var sequenceCode = certificateNo.substring(14, 17); //3位，顺序码：奇为男，偶为女 
                var checkCode = certificateNo.substring(17); //1位，校验码：检验位  
                var province = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
                var year = birthday.substring(0, 4);
                var month = birthday.substring(4, 6);
                var day = birthday.substring(6);
                var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
                if (province[parseInt(address.substr(0, 2))] == null || (tempDate.getFullYear() != parseFloat(year) || tempDate.getMonth() != parseFloat(month) - 1 || tempDate.getDate() != parseFloat(day))) { //这里用getFullYear()获取年份，避免千年虫问题  
                    return Result = {
                        state: "身份证号码无效，请重新输入！",
                        status: false
                    };
                } else {
                    var weightedFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; //加权因子                      
                    var valideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，其中10代表X        
                    var certificateNoArray = certificateNo.split(""); // 得到身份证数组                   
                    var sum = 0; // 声明加权求和变量                    
                    if (certificateNoArray[17].toLowerCase() == 'x') {
                        certificateNoArray[17] = 10; // 将最后位为x的验证码替换为10     
                    }
                    for (var i = 0; i < 17; i++) {
                        sum += weightedFactors[i] * certificateNoArray[i]; // 加权求和                     
                    }
                    valCodePosition = sum % 11; // 得到验证码所在位置                  
                    if (certificateNoArray[17] == valideCode[valCodePosition]) {
                        var sex = 1;
                        if (sequenceCode % 2 == 0) {
                            sex = 0;
                        }
                        return Result = {
                            stateCode: sex,
                            state: sex == 0 ? '女' : '男',
                            status: true,
                            cardid: certificateNo,
                            address: address,
                            birth: birthday,
                            sequenceCode: sequenceCode,
                            checkCode: checkCode
                        };
                    } else {
                        return Result = {
                            state: "身份证号码无效，请重新输入！",
                            status: fasle
                        };
                    }
                }
            }
        }
    },
    tools: {
        slider: {
            num: Math.floor(Math.random() * (1 - 1000) + 1000),
            switchs: false,
            sli: 0,
            lefter: null,
            stop: true,
            create: (smallimg, photo, node) => {
                var htmlnode =
                    `<div class="containerBox${single.tools.slider.num}"
                        style="
                            box-sizing: border-box;
                            width: 100%;
                            height: 40px;
                            border: 1px solid #e4e7eb;
                            position: relative;
                            background: #f7f9fa;
                            line-height: 40px;
                            color: #45494c;
                            outline: none;
                            user-select:none;
                            moz-user-select: -moz-none;
                            -moz-user-select: none;
                            -o-user-select:none;
                            -khtml-user-select:none;
                            -webkit-user-select:none;
                            -ms-user-select:none;"
                        >
                    <div class="ph${single.tools.slider.num}" 
                        style="
                            width: 100%;
                            position: absolute;
                            left: -1px;
                            top: -192px;
                            display: none;
                            z-index: 2;
                            overflow: hidden;"
                        >
                        <img src="data:image/png;base64,${photo}" class="photo${single.tools.slider.num}"
                            style="
                                z-index: 3;
                                width: 100%;
                                background: white;"
                            />
                        <img src="data:image/png;base64,${smallimg}" class="smallimg${single.tools.slider.num}"
                            style="
                                z-index: 1000;
                                position: absolute;
                                left: -1px;
                                top: 2px;"
                            />
                        <div class="refresh${single.tools.slider.num}"
                            style="
                                width: 34px; height: 34px;
                                position: absolute;
                                right: 0;
                                top: 0;
                                cursor: pointer;
                                background-size: 34px 471px;
                                background: url(images/untitled2.png) 0 -437px;
                                z-index: 2000;
                            "
                        ></div>
                    </div>
                    <div class="slider${single.tools.slider.num}"
                        style="
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 40px;
                            height: 38px;
                            box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                            background: #fff;
                            z-index: 1;"
                        >
                        <span class="sliderIcon${single.tools.slider.num}"
                            style="
                                position: absolute;
                                top: 15px;
                                left: 13px;
                                width: 14px;
                                height: 10px;
                                background: url(images/untitled2.png) 0 -26px;
                                background-size: 34px 471px;"
                            ></span>
                    </div>
                    <div class="texts${single.tools.slider.num}"
                        style="
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;top: 0;
                            text-align: center;"
                        >向右滑动滑块填充拼图</div>
                </div>`;
                $('.' + node).append(htmlnode);

                $('.slider' + single.tools.slider.num).mousedown(function(e) {
                    $(this).css('transition', 'none');
                    $('.smallimg' + single.tools.slider.num).css('transition', 'none');
                    single.tools.slider.sli = e.clientX - $(this).offset().left;
                    single.tools.slider.switchs = true;
                });
                $('.containerBox' + single.tools.slider.num).hover(function() {
                    $('.ph' + single.tools.slider.num).stop().fadeIn(400);
                    $('.smallimg' + single.tools.slider.num).height($('.photo' + single.tools.slider.num).height())
                }, function() {
                    $('.ph' + single.tools.slider.num).stop().fadeOut(400);
                });

                $('.refresh' + single.tools.slider.num).click(function() {
                    if (single.tools.slider.stop) {
                        // getimg();
                    }
                })
            }
        }
    },
    dragtrip: (node, size) => {
        var dragSwitch = false;
        var objsize = {},
            objnumber = null;
        if (typeof size == Object) {
            objsize.min = size.min;
            objsize.max = size.max;
        } else if (typeof size == Number) {
            objnumber = size;
        }

        function dragSwitch(boolear) {
            dragSwitch = boolear;
            if (dragSwitch) {
                const elem = document.getElementsByClassName('fourA-drag-midea')[0]
                const leftelem = document.getElementsByClassName(node)[0]
                let widthResult = null
                window.onmousemove = function(ev) {
                    widthResult = ev.clientX
                    if (ev.clientX < objnumber == null ? objsize.min : objnumber)
                        widthResult = objnumber == null ? objsize.min : objnumber
                    else if (ev.clientX > (objsize.max || 500))
                        widthResult = objsize.max || 500
                    leftelem.style.width = widthResult + 'px'
                    elem.setAttribute('style', 'position : fixed; left : ' + widthResult + 'px')
                }
            } else
                window.onmousemove = null
        }
        var elems = `<div class="fourA-drag-midea" style="width: 5px; border-left: 1px solid #eee; height: 100%; margin: 0; padding: 0; cursor: ew-resize" onmousedown="dragSwitch(true)" onmouseup="dragSwitch(false)"></div>`;
        document.getElementsByClassName(node)[0].appendChild(elems);

        window.onmouseup = function() {
            if (dragSwitch)
                dragSwitch(false);
        }
    }
}