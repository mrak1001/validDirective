//create by mohammad-rahmati 1394/10/10
define(['app'], function (app) {
    app.directive('validDirective', function () {
        var validate = {
            isEmpty: isEmpty,
            isUsername: isUsername,
            isEmail: isEmail,
            isPassword: isPassword,
            isMobile: isMobile,
            number6: number6,
            number11start1: number11start1,
            isNationalCode: isNationalCode,
            isJalaliDate: isJalaliDate,
            isPersianAlpha: isPersianAlpha,
            isPersianAlphaNumeric: isPersianAlphaNumeric,
            isAlphaNumeric: isAlphaNumeric,
            isNumeric: isNumeric,
            Day30: Day30,
            setPass: setPass,
            percent: percent // برای موارد درصد استفاده می شود
        };
        return {
            restrict: 'EA',
            scope: {
                dir: '=ngModel',
                func: '@validDirective',
                function:'=click'
            },
            link: function (scope, elem, attr) {
                $(elem[0].parentElement).append('<div class="error" id=1' + elem[0].id + '></div>');
                //-------------------------------- عمل کردن دایرکتیو برای کلیک شدن یا رد شدن از المنت --
                elem.bind(((scope.func == 'click') ? 'click' : 'blur'), function () {
                    var selector = 'input,select,textarea';//----  تگ های استفاده شده در صفحه  ----
                    if (scope.func == 'click') {
                        var sub = submit($(selector), elem, true),
                            checkErr = sub.checkErr;
                        if (checkErr) {
                            //------------------ در صورت درست بودن ولیدیت فانکشن ارسالی فراخوانی میگردد ----------------
                           scope.function(sub.arr_value);
                        }
                    }
                    else {
                        blurValid(attr.id, elem.val(), scope.func);
                    }
                });
                //---------- گذاشتن کاما به طور خودکار تمام فیلد هایی که اپشن ادیشنال دارند ----------------------------
                scope.$watch('dir', function () {
                    if (elem[0].attributes['price']) {
                        scope.dir = createNum(scope.dir, elem[0].id);
                    }
                })
            }
        };
        //------------------- چک کردن تمام فرم بعد از زدن دکمه ادامه و ساخت ابجکت ارسال --------------------------------
        function submit(selector, elem, checkErr) {
            var arr_value = {}, files = [];
            for (var i = 0; i < selector.length; i++) {
                if (selector[i].attributes['file-input'] == undefined) {
                    if (selector[i].attributes['valid-directive'] && selector[i].attributes['valid-directive'].value != '') {
                        var func = selector[i].attributes['valid-directive'].value;
                        if (blurValid(selector[i].id, selector[i].value, func, elem)) {
                            arr_value[selector[i].id]=selector[i].attributes['price']?deleteComma(selector[i].value):selector[i].value;
                        }
                        else {
                            checkErr = false;
                        }
                    }
                }
                else if (selector[i].files.length) {
                    //-------------------------------- جهت استفاده برای بارگزاری فایل ----------------------------------
                    files.push({
                        file: selector[i].files,
                        id: selector[i].id
                    });
                }
            }
            if (files.length) {
                arr_value.file = files;
            }
            return ({arr_value: arr_value, checkErr: checkErr})
        }

        //---------------------------------------- اعتبار سنجی تک تک فیلدها با رد شدن از آنها --------------------------
        function blurValid(id, value, func) {
            if (func != '') {
                var arr_func = func.split(',');
            }
            for (var i in arr_func) {
                //-----------------------------------------------------------------------------------
                if (arr_func[i] != 'click' && !validate[arr_func[i]](value)) {
                    $('#' + id).addClass('inputError');
                    $('#1' + id).html('<p>' + msg.form[arr_func[i]] + '</p>');
                    return false;
                }
                else {
                    $('#' + id).removeClass('inputError');
                    $('#1' + id).html('');
                    if (i == arr_func.length - 1) {
                        return true;
                    }
                }
            }
        }
    });
});

//------------------------------------------------ کلاس های مورد نیاز --------------------------------------------------
/*
 .inputError {
 border: 2px solid #cd0a0a !important;
 border-radius: 5px;
 padding: 7px;
 box-shadow: none;
 }

 .inputError:hover {
 border-color: #888;
 }

 .inputError:focus {
 border-color: #0078d7;
 }

 select.inputError {
 border: 2px solid #cd0a0a;
 border-radius: 5px;
 padding: 7px;
 width: 100%;
 color: #999;
 }
 div.error {
 position: relative;
 top: 0;
 }

 div.error p {
 position: absolute;
 top: 0;
 color: #cd0a0a;
 left: 0;
 right: 0;
 line-height: 1.75 !important;
 }
 */

//------------------------------------------------ پیام ها -------------------------------------------------------------
var msg = {
    "form": {
        allEmpty: 'پر کردن تمامی موارد الزامی است.',
        errorField: 'این ایتم در قالب تعریف شده نمی باشد.',
        isEmpty: 'فیلد را پر نمایید.',
        isUsername: 'حداقل 4  کاراکتر (a-z , 0-9)',
        isEmail: 'ایمیل را با فرمت صحیح وارد نمایید.',
        isPassword: 'حداقل 6  کاراکتر بدون(@,#,$,%,^,&,...)',
        setPass: 'رمز عبور با تکرار آن یکسان نمی باشد.',
        number6: 'عدد شش رقمی صحیح وارد شود.',
        number11start1: 'عدد یازده رقمی و شروع با 1',
        isNationalCode: 'کد ملی  به صورت صحیح وارد شود.',
        isJalaliDate: 'فرمت تاریخ را به طور صحیح وارد نمایید.',
        isPersianAlpha: 'حروف فارسی وارد شود.',
        isPersianAlphaNumeric: 'اعداد فارسی وارد شود.',
        isAlphaNumeric: 'عدد وارد شود',
        isNumeric: 'عدد وارد شود',
        Day30: 'حداکثر 30 روز قابل قبول است.',
        isMobile: 'لطفا شماره موبایل را به صورت صحیح وارد نمایید.',
        percent: 'تنها اعداد بین 1 تا 100 صحیح است.',
        profileUser: 'رمز قبلی را اشتباه وارد کردید'
    }
};

//---------------------------------------------توابع اعتبار سنجی -------------------------------------------------------
function isUsername(str) {
    return str.match(/^[a-z][a-z0-9_\.]{3,24}$/i);
}

function isPassword(str) {
    return str.match(/^[\w,\s!#$%&? "'][\w,\s!#$%&? "'\u0600-\u06FF]{5,24}$/);
}

function isFileName(str) {
    return str.match(/^[\w,\s!@#$^&()\-+=\[\]\{\}\.\u0600-\u06FF]+$/i);
}

function isMobile(str) {
    return str.match(/^(\+989|09)[0-9]{9}$/);
}

function isJalaliDate(str) {
    return str.match(/^(13|14)\d\d\/((0?[1-6]\/(0?[1-9]|[12][0-9]|3[01]))|((0?[7-9]|1[012])\/(0?[1-9]|[12][0-9]|30)))$/);
}

function isJalaliBefore(str, jalaliDate) {
    try {
        if (!str.match(/^(13|14)\d\d\/((0?[1-6]\/(0?[1-9]|[12][0-9]|3[01]))|((0?[7-9]|1[012])\/(0?[1-9]|[12][0-9]|30)))$/)) {
            return false;
        }
        var date = str.split('/'),
            comp = new Date();
        date = toGregorian(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
        date = new Date(date[0], date[1] - 1, date[2]);

        if (jalaliDate) {
            jalaliDate = jalaliDate[0];
            if (!jalaliDate.match(/^(13|14)\d\d\/((0?[1-6]\/(0?[1-9]|[12][0-9]|3[01]))|((0?[7-9]|1[012])\/(0?[1-9]|[12][0-9]|30)))$/)) {
                return false;
            }
            comp = jalaliDate.split('/');
            comp = toGregorian(parseInt(comp[0]), parseInt(comp[1]), parseInt(comp[2]));
            comp = new Date(comp[0], comp[1] - 1, comp[2]);
        }

        return date <= comp;
    } catch (e) {
        return false;
    }
}

function isJalaliAfter(str, jalaliDate) {
    try {
        if (!str.match(/^(13|14)\d\d\/((0?[1-6]\/(0?[1-9]|[12][0-9]|3[01]))|((0?[7-9]|1[012])\/(0?[1-9]|[12][0-9]|30)))$/)) {
            return false;
        }
        var date = str.split('/'),
            comp = new Date();
        date = toGregorian(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
        date = new Date(date[0], date[1] - 1, date[2]);

        if (jalaliDate) {
            jalaliDate = jalaliDate[0];
            if (!jalaliDate.match(/^(13|14)\d\d\/((0?[1-6]\/(0?[1-9]|[12][0-9]|3[01]))|((0?[7-9]|1[012])\/(0?[1-9]|[12][0-9]|30)))$/)) {
                return false;
            }
            comp = jalaliDate.split('/');
            comp = toGregorian(parseInt(comp[0]), parseInt(comp[1]), parseInt(comp[2]));
            comp = new Date(comp[0], comp[1] - 1, comp[2]);
        }

        return date >= comp;
    } catch (e) {
        return false;
    }
}

function isPlainHtml(str) {
    var input = '' + decodeURIComponent(str);

    var newHtml = escapeHtml.removeJsTags(input);
    return newHtml == input;
}

function isPlainText(str) {
    var input = '' + decodeURIComponent(str);

    var newText = escapeHtml.removeTags(input);
    return newText == input;
}

function isCustomerNumber(str) {
    return str.match('');
}

function isPersianAlpha(str) {
    return str.match(/^[\u0621\u0622\u0627\u0623\u0628\u067e\u062a\u062b\u062c\u0686\u062d\u062e\u062f\u0630\u0631\u0632\u0698\u0633-\u063a\u0641\u0642\u06a9\u06af\u0644-\u0646\u0648\u0624\u0647\u06cc\u0626\u0625\u0671\u0643\u0629\u064a\u0649\u200c _@]*$/); // Persian and some common Arabic Alphabets, Space, Underscore, @, Ctrl+Shift+2
}

function isPersianEnglishAlphaNumeric(str) {
    return str.match(/^[\da-zA-Z\u0621\u0622\u0627\u0623\u0628\u067e\u062a\u062b\u062c\u0686\u062d\u062e\u062f\u0630\u0631\u0632\u0698\u0633-\u063a\u0641\u0642\u06a9\u06af\u0644-\u0646\u0648\u0624\u0647\u06cc\u0626\u0625\u0671\u0643\u0629\u064a\u0649\u200c _@]*$/); // English, Persian and some common Arabic Alphabets, Space, Underscore, @, Ctrl+Shift+2
}

function isPersianAlphaNumeric(str) {
    return str.match(/^[\d\u06f0-\u06f9\u0660-\u0669 \u0621\u0622\u0627\u0623\u0628\u067e\u062a\u062b\u062c\u0686\u062d\u062e\u062f\u0630\u0631\u0632\u0698\u0633-\u063a\u0641\u0642\u06a9\u06af\u0644-\u0646\u0648\u0624\u0647\u06cc\u0626\u0625\u0671\u0643\u0629\u064a\u0649\u200c _@]*$/); // Persian and some common Arabic Alphabets, Space, Underscore, @, Ctrl+Shift+2
}

function isPersianYear(str) {
    return str.match(/^(13|14)\d\d$/);
}

function isCardNumber(str) {
    return str.match(/^(\d{16}|(\d{4}-){3}\d{4})$/);
}

function isPhone(str) {
    return str.match(/^0?(([1-9]{2}\-?[1-9][0-9]{7})|([1-9][0-9]{2}\-?[1-9][0-9]{6}))$/);
}

function isQueryString(str) {
    return str.match(/^(("\w+=\w+(&\w+=\w+)*")|(\w+=\w+(&\w+=\w+)*))$/);
}

function isCookie(str) {
    return str.match(/^(("\w+=\w+(; \w+=\w+)*")|(\w+=\w+(; \w+=\w+)*))$/);
}

function isNationalCode(str) {
    try {
        var meli_code = str;
        if (meli_code.length == 10) {
            if (meli_code == '0000000000' ||
                meli_code == '1111111111' ||
                meli_code == '2222222222' ||
                meli_code == '3333333333' ||
                meli_code == '4444444444' ||
                meli_code == '5555555555' ||
                meli_code == '6666666666' ||
                meli_code == '7777777777' ||
                meli_code == '8888888888' ||
                meli_code == '9999999999') {
                return false;
            }
            var c = parseInt(meli_code.charAt(9));
            var n = parseInt(meli_code.charAt(0)) * 10 +
                parseInt(meli_code.charAt(1)) * 9 +
                parseInt(meli_code.charAt(2)) * 8 +
                parseInt(meli_code.charAt(3)) * 7 +
                parseInt(meli_code.charAt(4)) * 6 +
                parseInt(meli_code.charAt(5)) * 5 +
                parseInt(meli_code.charAt(6)) * 4 +
                parseInt(meli_code.charAt(7)) * 3 +
                parseInt(meli_code.charAt(8)) * 2;
            var r = n - parseInt(n / 11) * 11;
            if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}

function isPhoneMobile(str) {
    return isPhone(str) || isMobile(str);
}

function isBoolean(str) {
    return (str == 'false' || str == 'true');
}

function isFile(str, params) {
    var type = params && params[0] ? '(' + params[0] + ')' : '[0-9a-zA-Z]+',
        ext = params && params[1] ? '(' + params[1] + ')' : '[0-9a-zA-Z\\-\\.]+',
        regex = new RegExp('^data:' + type + '\/' + ext + ';base64,.*$', 'i');
    return str.match(regex);
}

function fileSize(str, params) {
    var bytes = new Buffer(str, 'base64');
    return (params[0] ? bytes.length < params[0] : true) &&
        (params[1] ? bytes.length >= params[1] : true);
}

function isImage(str, params) {
    var type = '(image)',
        ext = params && params[0] ? '(' + params[0] + ')' : '[0-9a-zA-Z\\-\\.]+',
        regex = new RegExp('^data:' + type + '\/' + ext + ';base64,.*$', 'i'),
        bytes = new Buffer(str, 'base64');
    return (params[1] ? bytes.length < params[1] : true) &&
        (params[2] ? bytes.length >= params[2] : true) &&
        str.match(regex);
}

function isObjectId(str) {
    return (str.length == 12 || str.length == 24);
}

function fileType(str, params) {
    var type = str.match(/^data:([A-Za-z0-9]+\/[A-Za-z0-9\-\.]+)?;/);
    for (var i = 0; i < params.length; i++) {
        var obj = params[i];
        if (mimes[obj] == type[1]) {
            return true;
        }
    }
    return false;
}

function isInArray(elems, array) {
    // elems can be ehither a string or an array of strings
    if (array.length == 0) {
        return false;
    }
    if (Object.prototype.toString.call(elems) === '[object Array]') {
        // do nothing
    } else {
        elems = [elems];
    }
    for (var i = 0; i < elems.length; i++) {
        var found = false;
        for (var j = 0; j < array.length; j++) {
            if (!found && array[j] === elems[i]) {
                found = true;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;

}

function isEmail(str) {
    return str.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
}

function isUrl(str) {
    //A modified version of the validator from @diegoperini / https://gist.github.com/729294
    console.log('>>>>>>>>>>>444444444444', str.length < 2083 && str.match(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i));
    return str.length < 2083 && str.match(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i);
}

function isIP(str) {
    if (isIPv4(str)) {
        return 4;
    } else if (isIPv6(str)) {
        return 6;
    } else {
        return 0;
    }
}

function isIPv4(str) {
    if (/^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/.test(str)) {
        var parts = str.split('.').sort();
        // no need to check for < 0 as regex won't match in that case
        if (parts[3] > 255) {
            return false;
        }
        return true;
    }
    return false;
}

function isIPv6(str) {
    if (/^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/.test(str)) {
        return true;
    }
    return false;
}

function isIPNet(str) {
    return isIP(str) !== 0;
}

function isAlpha(str) {
    return str.match(/^[a-zA-Z]+$/);
}

function isAlphaNumeric(str) {
    return str.match(/^[a-zA-Z0-9_@]+$/);
}

function isNumeric(str) {
    return str.match(/^-?[0-9]+$/);
}

function isHexadecimal(str) {
    return str.match(/^[0-9a-fA-F]+$/);
}

function isHexColor(str) {
    return str.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
}

function isLowercase(str) {
    return str === str.toLowerCase();
}

function isUppercase(str) {
    return str === str.toUpperCase();
}

function isInt(str) {
    return str.match(/^(?:-?(?:0|[1-9][0-9]*))$/);
}

function isDecimal(str) {
    return str !== '' && str.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/);
}

function isFloat(str) {
    return isDecimal(str);
}

function isDivisibleBy(str, n) {
    return (parseFloat(str) % parseInt(n, 10)) === 0;
}

function notNull(str) {
    return str !== '';
}

function isNull(str) {
    return str === '';
}

function notEmpty(str) {
    return !str.match(/^[\s\t\r\n]*$/);
}

function equals(a, b) {
    if (Object.prototype.toString.call(b) === '[object Array]' && b.length > 0) {
        return a == b[0];
    }
    return false;
}

function contains(str, elems) {
    // elems is an array of elements to be searched
    for (var i = 0; i < elems.length; i++) {
        if (!(str.indexOf(elems[i]) >= 0 && !!elems[i])) {
            return false;
        }
    }
    return true;
}

function notContains(str, elems) {
    return !contains(str, elems);
}

function regex(str, params) {
    // params = [pattern, modifiers];
    if (Object.prototype.toString.call(params) === '[object Array]' && params.length == 2) {
        str += '';
        if (Object.prototype.toString.call(params[0]).slice(8, -1) !== 'RegExp') {
            params[0] = new RegExp(params[0], params[1]);
        }
        return str.match(params[0]);
    }
    return false;
}

function is(str, params) {
    // params = [pattern, modifiers];
    return regex(str, params);
}

function notRegex(str, params) {
    // params = [pattern, modifiers];
    return !regex(str, params);
}

function not(str, params) {
    // params = [pattern, modifiers];
    return notRegex(str, params);
}

function len(str, params) {
    // params = [min, max];
    if (Object.prototype.toString.call(params) === '[object Array]' && (params.length == 1 || params.length == 2)) {
        return str.length >= params[0] && (params[1] === undefined || str.length <= params[1]);
    }
    return false;
}

function isDate(str) {
    var intDate = Date.parse(str);
    return !isNaN(intDate);
}

function isAfter(str, date) {
    date = date[0] || new Date();
    var origDate = toDate(str);
    var compDate = toDate(date);
    return !(origDate && compDate && origDate <= compDate);
}

function isBefore(str, date) {
    date = date[0] || new Date();
    var origDate = toDate(str);
    var compDate = toDate(date);
    return !(origDate && compDate && origDate >= compDate);
}

function min(str, val) {
    var number = parseFloat(str);
    val[0] = parseFloat(val[0]);
    return isDecimal('' + number) && isDecimal('' + val[0]) && number >= val[0];
}

function max(str, val) {
    var number = parseFloat(str);
    val[0] = parseFloat(val[0]);
    return isDecimal('' + number) && isDecimal('' + val[0]) && number <= val[0];
}

function isIn(str, params) {
    // params = [min, max]
    return min(str, [params[0]]) && max(str, [params[1]]);
}

function toDateTime(date) {
    if (date instanceof Date) {
        return date;
    }
    var intDate = Date.parse(date);
    if (isNaN(intDate)) {
        return null;
    }
    return new Date(intDate);
}

function toDate(date) {
    if (!(date instanceof Date)) {
        date = toDateTime(date);
    }
    if (!date) {
        return null;
    }
    return date;
}

function number6(str) {
    return str.match(/(^([1-9]))[0-9]{5}$/i);
}

function number11start1(str) {
    return str.match(/^(1)[0-9]{10}$/i);
}

function createNum(number, id) {
    try {
        number = typeof number != 'string' ? number.toString() : number;
        var num = number.replace(/[^\d]/g, '');
        if (num.length > 3)
            num = num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        number = num;
        return number;
    }
    catch (e) {
    }
}

function createPath(str) {
    if (str.indexOf('\\') > -1) {
        str = str.replace(/[\\]/g, '\\\\');
    }
    return str;
}

function isEmpty(str) {
    return (str === '' || str === '? undefined:undefined ?'||str=="?") ? null : str;
}

function deleteComma(str) {
    return (str.replace(/[,]+/g, "").trim());
}

function re_pass(re_pass, pass) {
    return (pass != re_pass) ? null : pass
}

function Day30(str) {
    str = parseInt(str);
    return !(str < 31 && str > 0) ? null : str;
}

function percent(str) {
    str = parseInt(str);
    return !(str < 101 && str > -1) ? null : str;
}

function setPass() {
    var len = $('input');
    var arrPass = [], arrId = [];
    for (var i = 0; i < len.length; i++) {
        if ((len[i].id.indexOf('pass') > -1 || len[i].id.indexOf('Pass') > -1) && len[i].value != "") {
            arrPass.push(len[i].value);
            arrId.push(len[i].id);
        }
    }
    if (arrPass.length > 1) {
        if (arrPass[0] != arrPass[1]) {
            return null;
        } else {
            for (i in arrId) {
                $('#' + arrId[i]).removeClass('inputError');
                $('#1' + arrId[i]).html('');
            }
            return true;
        }
    } else {
        return true;
    }
}

function numPos(str) {
    str = (str && typeof str != 'string') ? str.toString() : '';
    return str.match(/[^\d]/g);
}
