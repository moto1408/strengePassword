$(document).ready(function() {
    // 強度表示に使用する配色
    var baseColor = "#CCC";
    var shortColor = "#D75674";
    var weakColor = "#F56F50";
    var goodColor = "#FAAC2E";
    var strongColor = "#19B549";
    var veryStrongColor = "#00A2A1";
    // 表示メッセージ
    var resultMessage = "";
    // 弱いパスワードリスト
    var weekPasswordList = [
        "123456",
        "123456789",
        "picture1",
        "password",
        "12345678",
        "111111",
        "123123",
        "12345",
        "1234567890",
        "senha",
        "1234567",
        "qwerty",
        "abc123",
        "Million2",
        "000000",
        "1234",
        "iloveyou",
        "aaron431",
        "password1",
        "qqww1122",
    ];
    /**
     * パスワード強度を表示する関数
     * @param {*} strengthNumber 
     */
    const strengeResultOutPut = function(strengthNumber,message=""){
        let loopCount = strengthNumber + 1;
        $(".strength-result div").css("background-color",baseColor);
        switch(strengthNumber)
        {
            case 0:
                message = message == "" ? "短い" : message;
                for(var i=1; i<=loopCount; i++){
                    $(".strength-result div:nth-child(" + i + ")").css("background-color",shortColor);
                }
            break;

            case 1:
                message = message == "" ? "弱い" : message;
                for(var i=1; i<=loopCount; i++){
                    $(".strength-result div:nth-child(" + i + ")").css("background-color",weakColor);
                }
            break;

            case 2:
                message = message == "" ? "普通" : message;
                for(var i=1; i<=loopCount; i++){
                    $(".strength-result div:nth-child(" + i + ")").css("background-color",goodColor);
                }
            break;

            case 3:
                message = message == "" ? "良い" : message;
                for(var i=1; i<=loopCount; i++){
                    $(".strength-result div:nth-child(" + i + ")").css("background-color",strongColor);
                }
            break;

            case 4:
                message = message == "" ? "非常に良い" : message;
                for(var i=1; i<=loopCount; i++){
                    $(".strength-result div:nth-child(" + i + ")").css("background-color",veryStrongColor);
                }
            break;
        }
        $(".strength-result-word").text(message);
    }
    /**
     * 対象の文字列のパスワード強度を判定し数値を返す
     * @param {*} password 
     * @returns int 強度の数値
     */
    function checkStrength(password) {
        var strength = 0
        resultMessage = "";
        if (password.length < 6) {
            return 0;
        }
        
        // 弱いパスワード一覧から正規表現を作成する。
        let weekPassword = "";
        for(let i=0; i < weekPasswordList.length; i++ ){
            weekPassword += weekPasswordList[i] + (weekPasswordList.length - 1 != i ? "|" : "");
        }
        // 弱いパスワード一覧と該当するかチェック
        let matchWeekPassword = new RegExp("^(" + weekPassword + ")$");
        if (password.match(matchWeekPassword)){
            resultMessage = "良く使用されるパスワードです。";
            return 1;
        }

        // passwordの一部置き換え文字チェック
        if (password.match(/^p.*ssw.*d$/)){
            resultMessage = "passwordの一部置換えは容易に想定されてしまいます。";
            return 1;
        }

        if (password.length > 7) strength += 1
        // パスワードに小文字と大文字の両方が含まれている場合は、強度の値を増やします。
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1

        // 数字や文字がある場合は、強度値を上げてください。
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1

        // 特殊文字が1つある場合は、強度値を増やします。
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1

        // 特殊文字が2つある場合は、強度値を大きくします。
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
        
        // 計算された強度値、メッセージを返すことができます
        // 値が2未満の場合
        if (strength < 2) {
            return 1;
        } else if (strength == 2) {
            return 2;
        } else if (strength == 3) {
            return 3;
        }else if (strength > 3) {
            return 4;
        }
    }

    /**
     * パスワードチェック実行処理
     */
    $(".check-strength input[type=password]").keyup(function(){
        
        // 強度の表示DOMが存在しなければ作成する。
        if($(this).parent().find(".strength-result").length == 0)
        {
            // パスワード強度メーターアンダーバーのDOM
            let strengthResultDom = $('<div></div>',{
                addClass:"strength-result w-100 clearfix my-2"
            });
            strengthResultDom.append($("<div></div>"));
            strengthResultDom.append($("<div></div>"));
            strengthResultDom.append($("<div></div>"));
            strengthResultDom.append($("<div></div>"));
            strengthResultDom.append($("<div></div>"));
            
            $(this).parent().append(strengthResultDom);
            // パスワード強度メーターアンダーバーのスタイル
            $(this).parent().find(".strength-result div").css({
                "float":"left",
                "margin-right":"0.5rem",
                "width": "calc(100% / 5 - 0.4rem)",
                "height": "10px",
                "background-color": "#CCC",
                "border-radius": "5px",
            });
            $(this).parent().find(".strength-result div:last-child").css({
                "margin-right":"0",
            });

            // パスワード強度テキストメッセージDOM
            let strengthResultWordDom = $('<div></div>',{
                addClass:"strength-result-word w-100 my-1"
            });
            $(this).parent().append(strengthResultWordDom);


        }

        // パスワード強度No取得
        let strengthNumber = checkStrength($(this).val());

        // パスワード強度の結果を画面へ表示する。
        strengeResultOutPut(strengthNumber,resultMessage);
    });
});
