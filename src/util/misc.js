

// 时间转化，，
// date 传入时间对象
// format 转化形式 eq: yyyy/MM/dd hh:mm => 1996/11/22 09: 11
// m+ 月 比如 mm则变成 03
export function dateFormat(date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};
/**
 * 
 * @param {*} time  1996-01-20
 */
export let dateBirth = {
    getYMD(strBirthday) {
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];
      return {
        year: +birthYear,
        month: +birthMonth,
        day: +birthDay
      }
    },
    getAge(strBirthday) {
      if (!strBirthday) return ''
      var returnAge;
      var YMD = dateBirth.getYMD(strBirthday);
      var birthYear = YMD.year;
      var birthMonth = YMD.month;
      var birthDay = YMD.day;
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
      }
      else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            }
            else {
              returnAge = ageDiff;
            }
          }
          else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            }
            else {
              returnAge = ageDiff;
            }
          }
        }
        else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      }

      return returnAge;
    },
    getConstellation(strBirthday) {
      if (!strBirthday) return ''
      var YMD = dateBirth.getYMD(strBirthday);
      var birthMonth = YMD.month;
      var birthDay = YMD.day;
      var m = +birthMonth;
      var d = +birthDay;
      var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2);
    }
  }
