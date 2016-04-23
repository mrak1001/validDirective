# *directiveValidate* #

##دایرکتیو اعتبار سنجی##

1. [توضیحات](#1)
2. [روش فراخوانی](#2)

### <a name="1"></a> توضیحات ###

                                              اعتبار سنجی مجموعه ای از تگها در فرم یا صفحه
                                               
     1.             در تگ مورد نظر بایستی نوشته شود که هر تگ بایستی ای دی خود را دارا باشد valid-directive="functionValidate1,functionValidate2,..."
     
                        
     2.              در این دایرکتیو به صورت پیش فرض سه تگ اینپوت و سلکت و تکست ارای در نظر گرفته شده که در صورت اضافه شدن تگ جدید بایستی 

                      اسم تگ به وری ایبل سلکتور در خط        33  اضافه شود
                                                 
     3.              اعتبار سنجی هم بصورت تکی انجام شده و هم بصورت یکجا که در صورت یکجا باید در دکمه سابمیت به این شکل 
                                                      
                       اضافه شود valid-directive="click" for="selector for valid content EXM:'#myForm'" click="function for after valid"
                                     
     4.              بعد از اعتبارسنجی تمام تگ هایی که دایرکتیو در انها صدا زده شده باشد ابجکتی از ولیو انها تشکیل میشود و به تابع فرستاده شده از تگ 
                                          
                       ارسال میگردد 
                        
     5.           اضافه کردن اتربیوت های لازم
                             
                             1. price  : برای تگ هایی که مبلغ را نمایش میدهند 100,212,000   <input type="text" id="money" valid-directive="isEmpty" price/> or 
                             <td id="price" valid-directive price>{{enyNumber}}</td>
                             
                             2. file-input : برای  بارگزاری فایل  <input type="file" id="myFile" valid-directive="" file-input/>
                             
                             3. number : فقط عدد وارد میشود   <input type="text" valid-directive number>
                             
     6.                                   

----------

### <a name="2"></a> روش فراخوانی ###

        input type="text" id="user" ng-model="user" valid-directive="isEmpty,isUsername"/>   
           
        or
        
        input type="text" id="pass" ng-model="pass" valid-directive="isEmpty,isPassword"/>   
           
        or
        
        textarea id="email" ng-model="email" valid-directive="isEmpty,isEmail"></textarea/>
        
----------

