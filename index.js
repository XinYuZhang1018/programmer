exports.intpack = (content) => {
    console.log(content)
    const arraysCH = ['低', '低', '中', '强', '密码不能小于8位并且不能大于16位!'];
    const arraysEN = ['low', 'low', 'middle', 'strong', 'byte'];
    let ayIndex = 0;
    if (/[a-zA-Z]/.test(content))
        ayIndex++;
    if (/\d+/.test(content))
        ayIndex++;
    if (/[^0-9a-zA-Z]/.test(content))
        ayIndex++;
    if (content.length < 8 || content.length > 16)
        ayIndex = 0 //ayIndex = 4;
    let Result = {
        state: arraysCH[ayIndex],
        status: arraysEN[ayIndex]
    }
    return Result;
}