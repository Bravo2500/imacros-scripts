var groupUrl = prompt("Введите ссылку на мобильную страницу участников группы, например: http://m.ok.ru/typicalnsk/members");
var membersSum = prompt("Сколько участников обрабатываем?", 300);

var groupPosition = prompt("№ группы, в которую идут приглашения (ее позиция в списке, 1, 2 или 3 и т.д.)", 1); //Группа, в которую идут приглашения, а точнее ее позиция в списке, например 1 - первая, 2 - вторая.

var offset = prompt("С какого по счету участника начать обработку?", 0); // С какого по счету участника начать обработку? (подсчет начинается с 0)

var scrollSum = membersSum + offset / 40;
var errtext = "";

iimDisplay("Going to link...");

var macro = "CODE: \n";
macro += "SET !ERRORIGNORE YES \n";
macro += "TAB T=1 \n";
macro += "URL GOTO=" + groupUrl + "\n";
macro += "WAIT SECONDS=3 \n";

iimDisplay("Scrolling...");

for (i=0;i<scrollSum;i++) {
    var randomTimeout = Math.floor(Math.random() * 5) + 1;
    macro += "URL GOTO=javascript:window.scrollBy(0,20000) \n";
    macro += "WAIT SECONDS=" + randomTimeout +" \n";
}

for (i=offset;i<membersSum;i++) {
    macro += "SET !EXTRACT NULL \n";

    var iteration = i + 1;

    macro += "TAG POS=" + iteration + " TYPE=A ATTR=CLASS:clnk EXTRACT=HREF \n";
    macro += "TAB OPEN \n";
    macro += "TAB T=2 \n";
    macro += "URL GOTO={{!EXTRACT}} \n";

    macro += "TAG POS=1 TYPE=A ATTR=HREF:*altGroupSelectGroupToAdd* \n";


    macro += "TAG POS=" + groupPosition + " TYPE=A ATTR=CLASS:sclnk \n";
    macro += "TAG POS=1 TYPE=INPUT ATTR=NAME:button_send \n";

    macro += "TAB CLOSE \n";
    macro += "TAB T=1 \n";

    iimDisplay("Iteration #" + iteration);
}

retcode = iimPlay(macro);

if (retcode < 0) {
    errtext = iimGetLastError();
    alert(errtext);
}

