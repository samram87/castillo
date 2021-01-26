/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var APP = {
    url: "http://75.101.242.153/core/pedidos/", //url="http://ec2-3-17-121-233.us-east-2.compute.amazonaws.com/core/pedidos"
    login: "index.html",
    dashboard: "dashboard.html",
    latitud: null,
    longitud: null
};

var MUNICIPIOS=[{"CODI_MUNI":"001","CODI_DEPA":"01","NOMB_MUNI":"AHUACHAPAN"}, {"CODI_MUNI":"002","CODI_DEPA":"01","NOMB_MUNI":"APANECA"}, {"CODI_MUNI":"003","CODI_DEPA":"01","NOMB_MUNI":"ATIQUIZAYA"}, {"CODI_MUNI":"004","CODI_DEPA":"01","NOMB_MUNI":"CONCEPCION DE ATACO"}, {"CODI_MUNI":"005","CODI_DEPA":"01","NOMB_MUNI":"EL REFUGIO"}, {"CODI_MUNI":"006","CODI_DEPA":"01","NOMB_MUNI":"GUAYMANGO"}, {"CODI_MUNI":"007","CODI_DEPA":"01","NOMB_MUNI":"JUJUTLA"}, {"CODI_MUNI":"008","CODI_DEPA":"01","NOMB_MUNI":"SAN FRANCISCO MENENDEZ"}, {"CODI_MUNI":"009","CODI_DEPA":"01","NOMB_MUNI":"SAN LORENZO"}, {"CODI_MUNI":"010","CODI_DEPA":"01","NOMB_MUNI":"SAN PEDRO PUXTLA"}, {"CODI_MUNI":"011","CODI_DEPA":"01","NOMB_MUNI":"TACUBA"}, {"CODI_MUNI":"012","CODI_DEPA":"01","NOMB_MUNI":"TURIN"}, {"CODI_MUNI":"013","CODI_DEPA":"02","NOMB_MUNI":"SANTA ANA"}, {"CODI_MUNI":"014","CODI_DEPA":"02","NOMB_MUNI":"CANDELARIA LA FRONTERA"}, {"CODI_MUNI":"015","CODI_DEPA":"02","NOMB_MUNI":"COATEPEQUE"}, {"CODI_MUNI":"016","CODI_DEPA":"02","NOMB_MUNI":"CHALCHUAPA"}, {"CODI_MUNI":"017","CODI_DEPA":"02","NOMB_MUNI":"EL CONGO"}, {"CODI_MUNI":"018","CODI_DEPA":"02","NOMB_MUNI":"EL PORVENIR"}, {"CODI_MUNI":"019","CODI_DEPA":"02","NOMB_MUNI":"MASAHUAT"}, {"CODI_MUNI":"020","CODI_DEPA":"02","NOMB_MUNI":"METAPAN"}, {"CODI_MUNI":"021","CODI_DEPA":"02","NOMB_MUNI":"SAN ANTONIO PAJONAL"}, {"CODI_MUNI":"022","CODI_DEPA":"02","NOMB_MUNI":"SAN SEBASTIAN SALITRILLO"}, {"CODI_MUNI":"023","CODI_DEPA":"02","NOMB_MUNI":"SANTA ROSA GUACHIPILIN"}, {"CODI_MUNI":"024","CODI_DEPA":"02","NOMB_MUNI":"SANTIAGO DE LA FRONTERA"}, {"CODI_MUNI":"025","CODI_DEPA":"02","NOMB_MUNI":"TEXISTEPEQUE"}, {"CODI_MUNI":"026","CODI_DEPA":"03","NOMB_MUNI":"SONSONATE"}, {"CODI_MUNI":"027","CODI_DEPA":"03","NOMB_MUNI":"ACAJUTLA"}, {"CODI_MUNI":"028","CODI_DEPA":"03","NOMB_MUNI":"ARMENIA"}, {"CODI_MUNI":"029","CODI_DEPA":"03","NOMB_MUNI":"CALUCO"}, {"CODI_MUNI":"030","CODI_DEPA":"03","NOMB_MUNI":"CUISNAHUAT"}, {"CODI_MUNI":"031","CODI_DEPA":"03","NOMB_MUNI":"IZALCO"}, {"CODI_MUNI":"032","CODI_DEPA":"03","NOMB_MUNI":"JUAYUA"}, {"CODI_MUNI":"033","CODI_DEPA":"03","NOMB_MUNI":"NAHUIZALCO"}, {"CODI_MUNI":"034","CODI_DEPA":"03","NOMB_MUNI":"NAHUILINGO"}, {"CODI_MUNI":"035","CODI_DEPA":"03","NOMB_MUNI":"SALCOATITAN"}, {"CODI_MUNI":"036","CODI_DEPA":"03","NOMB_MUNI":"SAN ANTONIO DEL MONTE"}, {"CODI_MUNI":"037","CODI_DEPA":"03","NOMB_MUNI":"SAN JULIAN"}, {"CODI_MUNI":"038","CODI_DEPA":"03","NOMB_MUNI":"SANTA CATARINA MASAHUAT"}, {"CODI_MUNI":"039","CODI_DEPA":"03","NOMB_MUNI":"SANTA ISABEL ISHUATAN"}, {"CODI_MUNI":"040","CODI_DEPA":"03","NOMB_MUNI":"SANTO DOMINGO DE GUZMAN"}, {"CODI_MUNI":"041","CODI_DEPA":"03","NOMB_MUNI":"SONZACATE"}, {"CODI_MUNI":"042","CODI_DEPA":"04","NOMB_MUNI":"CHALATENANGO"}, {"CODI_MUNI":"043","CODI_DEPA":"04","NOMB_MUNI":"AGUA CALIENTE"}, {"CODI_MUNI":"044","CODI_DEPA":"04","NOMB_MUNI":"ARCATAO"}, {"CODI_MUNI":"045","CODI_DEPA":"04","NOMB_MUNI":"AZACUALPA"}, {"CODI_MUNI":"046","CODI_DEPA":"04","NOMB_MUNI":"SAN JOSE CANCASQUE"}, {"CODI_MUNI":"047","CODI_DEPA":"04","NOMB_MUNI":"CITALA"}, {"CODI_MUNI":"048","CODI_DEPA":"04","NOMB_MUNI":"COMALAPA"}, {"CODI_MUNI":"049","CODI_DEPA":"04","NOMB_MUNI":"CONCEPCION QUEZALTEPEQUE"}, {"CODI_MUNI":"050","CODI_DEPA":"04","NOMB_MUNI":"DULCE NOMBRE DE MARIA"}, {"CODI_MUNI":"051","CODI_DEPA":"04","NOMB_MUNI":"EL CARRIZAL"}, {"CODI_MUNI":"052","CODI_DEPA":"04","NOMB_MUNI":"EL PARAISO"}, {"CODI_MUNI":"053","CODI_DEPA":"04","NOMB_MUNI":"LA LAGUNA"}, {"CODI_MUNI":"054","CODI_DEPA":"04","NOMB_MUNI":"LA PALMA"}, {"CODI_MUNI":"055","CODI_DEPA":"04","NOMB_MUNI":"LA REINA"}, {"CODI_MUNI":"056","CODI_DEPA":"04","NOMB_MUNI":"SAN JOSE LAS FLORES"}, {"CODI_MUNI":"057","CODI_DEPA":"04","NOMB_MUNI":"LAS VUELTAS"}, {"CODI_MUNI":"058","CODI_DEPA":"04","NOMB_MUNI":"NOMBRE DE JESUS"}, {"CODI_MUNI":"059","CODI_DEPA":"04","NOMB_MUNI":"NUEVA CONCEPCION"}, {"CODI_MUNI":"060","CODI_DEPA":"04","NOMB_MUNI":"NUEVA TRINIDAD"}, {"CODI_MUNI":"061","CODI_DEPA":"04","NOMB_MUNI":"OJOS DE AGUA"}, {"CODI_MUNI":"062","CODI_DEPA":"04","NOMB_MUNI":"POTONICO"}, {"CODI_MUNI":"063","CODI_DEPA":"04","NOMB_MUNI":"SAN ANTONIO DE LA CRUZ"}, {"CODI_MUNI":"064","CODI_DEPA":"04","NOMB_MUNI":"SAN ANTONIO DE LOS RANCHOS"}, {"CODI_MUNI":"065","CODI_DEPA":"04","NOMB_MUNI":"SAN FERNANDO"}, {"CODI_MUNI":"066","CODI_DEPA":"04","NOMB_MUNI":"SAN FRANCISCO LEMPA"}, {"CODI_MUNI":"067","CODI_DEPA":"04","NOMB_MUNI":"SAN FRANCISCO MORAZAN"}, {"CODI_MUNI":"068","CODI_DEPA":"04","NOMB_MUNI":"SAN IGNACIO"}, {"CODI_MUNI":"069","CODI_DEPA":"04","NOMB_MUNI":"SAN ISIDRO LABRADOR"}, {"CODI_MUNI":"070","CODI_DEPA":"04","NOMB_MUNI":"SAN LUIS DEL CARMEN"}, {"CODI_MUNI":"071","CODI_DEPA":"04","NOMB_MUNI":"SAN MIGUEL DE MERCEDES"}, {"CODI_MUNI":"072","CODI_DEPA":"04","NOMB_MUNI":"SAN RAFAEL"}, {"CODI_MUNI":"073","CODI_DEPA":"04","NOMB_MUNI":"SANTA RITA"}, {"CODI_MUNI":"074","CODI_DEPA":"04","NOMB_MUNI":"TEJUTLA"}, {"CODI_MUNI":"075","CODI_DEPA":"05","NOMB_MUNI":"SANTA TECLA"}, {"CODI_MUNI":"076","CODI_DEPA":"05","NOMB_MUNI":"ANTIGUO CUSCATLAN"}, {"CODI_MUNI":"077","CODI_DEPA":"05","NOMB_MUNI":"CIUDAD ARCE"}, {"CODI_MUNI":"078","CODI_DEPA":"05","NOMB_MUNI":"COLON"}, {"CODI_MUNI":"079","CODI_DEPA":"05","NOMB_MUNI":"COMASAGUA"}, {"CODI_MUNI":"080","CODI_DEPA":"05","NOMB_MUNI":"CHILTIUPAN"}, {"CODI_MUNI":"081","CODI_DEPA":"05","NOMB_MUNI":"HUIZUCAR"}, {"CODI_MUNI":"082","CODI_DEPA":"05","NOMB_MUNI":"JAYAQUE"}, {"CODI_MUNI":"083","CODI_DEPA":"05","NOMB_MUNI":"JICALAPA"}, {"CODI_MUNI":"084","CODI_DEPA":"05","NOMB_MUNI":"LA LIBERTAD"}, {"CODI_MUNI":"085","CODI_DEPA":"05","NOMB_MUNI":"NUEVO CUSCATLAN"}, {"CODI_MUNI":"086","CODI_DEPA":"05","NOMB_MUNI":"SAN JUAN OPICO"}, {"CODI_MUNI":"087","CODI_DEPA":"05","NOMB_MUNI":"QUEZALTEPEQUE"}, {"CODI_MUNI":"088","CODI_DEPA":"05","NOMB_MUNI":"SACACOYO"}, {"CODI_MUNI":"089","CODI_DEPA":"05","NOMB_MUNI":"SAN JOSE VILLANUEVA"}, {"CODI_MUNI":"090","CODI_DEPA":"05","NOMB_MUNI":"SAN MATIAS"}, {"CODI_MUNI":"091","CODI_DEPA":"05","NOMB_MUNI":"SAN PABLO TACACHICO"}, {"CODI_MUNI":"092","CODI_DEPA":"05","NOMB_MUNI":"TALNIQUE"}, {"CODI_MUNI":"093","CODI_DEPA":"05","NOMB_MUNI":"TAMANIQUE"}, {"CODI_MUNI":"094","CODI_DEPA":"05","NOMB_MUNI":"TEOTEPEQUE"}, {"CODI_MUNI":"095","CODI_DEPA":"05","NOMB_MUNI":"TEPECOYO"}, {"CODI_MUNI":"096","CODI_DEPA":"05","NOMB_MUNI":"ZARAGOZA"}, {"CODI_MUNI":"097","CODI_DEPA":"06","NOMB_MUNI":"SAN SALVADOR"}, {"CODI_MUNI":"098","CODI_DEPA":"06","NOMB_MUNI":"AGUILARES"}, {"CODI_MUNI":"099","CODI_DEPA":"06","NOMB_MUNI":"APOPA"}, {"CODI_MUNI":"100","CODI_DEPA":"06","NOMB_MUNI":"AYUTUXTEPEQUE"}, {"CODI_MUNI":"101","CODI_DEPA":"06","NOMB_MUNI":"CUSCATANCINGO"}, {"CODI_MUNI":"102","CODI_DEPA":"06","NOMB_MUNI":"CIUDAD DELGADO"}, {"CODI_MUNI":"103","CODI_DEPA":"06","NOMB_MUNI":"EL PAISNAL"}, {"CODI_MUNI":"104","CODI_DEPA":"06","NOMB_MUNI":"GUAZAPA"}, {"CODI_MUNI":"105","CODI_DEPA":"06","NOMB_MUNI":"ILOPANGO"}, {"CODI_MUNI":"106","CODI_DEPA":"06","NOMB_MUNI":"MEJICANOS"}, {"CODI_MUNI":"107","CODI_DEPA":"06","NOMB_MUNI":"NEJAPA"}, {"CODI_MUNI":"108","CODI_DEPA":"06","NOMB_MUNI":"PANCHIMALCO"}, {"CODI_MUNI":"109","CODI_DEPA":"06","NOMB_MUNI":"ROSARIO DE MORA"}, {"CODI_MUNI":"110","CODI_DEPA":"06","NOMB_MUNI":"SAN MARCOS"}, {"CODI_MUNI":"111","CODI_DEPA":"06","NOMB_MUNI":"SAN MARTIN"}, {"CODI_MUNI":"112","CODI_DEPA":"06","NOMB_MUNI":"SANTIAGO TEXACUANGOS"}, {"CODI_MUNI":"113","CODI_DEPA":"06","NOMB_MUNI":"SANTO TOMAS"}, {"CODI_MUNI":"114","CODI_DEPA":"06","NOMB_MUNI":"SOYAPANGO"}, {"CODI_MUNI":"115","CODI_DEPA":"06","NOMB_MUNI":"TONACATEPEQUE"}, {"CODI_MUNI":"116","CODI_DEPA":"07","NOMB_MUNI":"COJUTEPEQUE"}, {"CODI_MUNI":"117","CODI_DEPA":"07","NOMB_MUNI":"CANDELARIA"}, {"CODI_MUNI":"118","CODI_DEPA":"07","NOMB_MUNI":"EL CARMEN"}, {"CODI_MUNI":"119","CODI_DEPA":"07","NOMB_MUNI":"EL ROSARIO"}, {"CODI_MUNI":"120","CODI_DEPA":"07","NOMB_MUNI":"MONTE DE SAN JUAN"}, {"CODI_MUNI":"121","CODI_DEPA":"07","NOMB_MUNI":"ORATORIO DE CONCEPCION"}, {"CODI_MUNI":"122","CODI_DEPA":"07","NOMB_MUNI":"SAN BARTOLOME PERULAPIA"}, {"CODI_MUNI":"123","CODI_DEPA":"07","NOMB_MUNI":"SAN CRISTOBAL"}, {"CODI_MUNI":"124","CODI_DEPA":"07","NOMB_MUNI":"SAN JOSE GUAYABAL"}, {"CODI_MUNI":"125","CODI_DEPA":"07","NOMB_MUNI":"SAN PEDRO PERULAPAN"}, {"CODI_MUNI":"126","CODI_DEPA":"07","NOMB_MUNI":"SAN RAFAEL CEDROS"}, {"CODI_MUNI":"127","CODI_DEPA":"07","NOMB_MUNI":"SAN RAMON"}, {"CODI_MUNI":"128","CODI_DEPA":"07","NOMB_MUNI":"SANTA CRUZ ANALQUITO"}, {"CODI_MUNI":"129","CODI_DEPA":"07","NOMB_MUNI":"SANTA CRUZ MICHAPA"}, {"CODI_MUNI":"130","CODI_DEPA":"07","NOMB_MUNI":"SUCHITOTO"}, {"CODI_MUNI":"131","CODI_DEPA":"07","NOMB_MUNI":"TENANCINGO"}, {"CODI_MUNI":"132","CODI_DEPA":"08","NOMB_MUNI":"ZACATECOLUCA"}, {"CODI_MUNI":"133","CODI_DEPA":"08","NOMB_MUNI":"CUYULTITAN"}, {"CODI_MUNI":"134","CODI_DEPA":"08","NOMB_MUNI":"EL ROSARIO"}, {"CODI_MUNI":"135","CODI_DEPA":"08","NOMB_MUNI":"JERUSALEN"}, {"CODI_MUNI":"136","CODI_DEPA":"08","NOMB_MUNI":"MERCEDES LA CEIBA"}, {"CODI_MUNI":"137","CODI_DEPA":"08","NOMB_MUNI":"OLOCUILTA"}, {"CODI_MUNI":"138","CODI_DEPA":"08","NOMB_MUNI":"PARAISO DE OSORIO"}, {"CODI_MUNI":"139","CODI_DEPA":"08","NOMB_MUNI":"SAN ANTONIO MASAHUAT"}, {"CODI_MUNI":"140","CODI_DEPA":"08","NOMB_MUNI":"SAN EMIGDIO"}, {"CODI_MUNI":"141","CODI_DEPA":"08","NOMB_MUNI":"SAN FRANCISCO CHINAMECA"}, {"CODI_MUNI":"142","CODI_DEPA":"08","NOMB_MUNI":"SAN JUAN NONUALCO"}, {"CODI_MUNI":"143","CODI_DEPA":"08","NOMB_MUNI":"SAN JUAN TALPA"}, {"CODI_MUNI":"144","CODI_DEPA":"08","NOMB_MUNI":"SAN JUAN TEPEZONTES"}, {"CODI_MUNI":"145","CODI_DEPA":"08","NOMB_MUNI":"SAN LUIS TALPA"}, {"CODI_MUNI":"146","CODI_DEPA":"08","NOMB_MUNI":"SAN LUIS LA HERRADURA"}, {"CODI_MUNI":"147","CODI_DEPA":"08","NOMB_MUNI":"SAN MIGUEL TEPEZONTES"}, {"CODI_MUNI":"148","CODI_DEPA":"08","NOMB_MUNI":"SAN PEDRO MASAHUAT"}, {"CODI_MUNI":"149","CODI_DEPA":"08","NOMB_MUNI":"SAN PEDRO NONUALCO"}, {"CODI_MUNI":"150","CODI_DEPA":"08","NOMB_MUNI":"SAN RAFAEL OBRAJUELO"}, {"CODI_MUNI":"151","CODI_DEPA":"08","NOMB_MUNI":"SANTA MARIA OSTUMA"}, {"CODI_MUNI":"152","CODI_DEPA":"08","NOMB_MUNI":"SANTIAGO NONUALCO"}, {"CODI_MUNI":"153","CODI_DEPA":"08","NOMB_MUNI":"TAPALHUACA"}, {"CODI_MUNI":"154","CODI_DEPA":"09","NOMB_MUNI":"SENSUNTEPEQUE"}, {"CODI_MUNI":"155","CODI_DEPA":"09","NOMB_MUNI":"CINQUERA"}, {"CODI_MUNI":"156","CODI_DEPA":"09","NOMB_MUNI":"VILLA DOLORES"}, {"CODI_MUNI":"157","CODI_DEPA":"09","NOMB_MUNI":"GUACOTECTI"}, {"CODI_MUNI":"158","CODI_DEPA":"09","NOMB_MUNI":"ILOBASCO"}, {"CODI_MUNI":"159","CODI_DEPA":"09","NOMB_MUNI":"JUTIAPA"}, {"CODI_MUNI":"160","CODI_DEPA":"09","NOMB_MUNI":"SAN ISIDRO"}, {"CODI_MUNI":"161","CODI_DEPA":"09","NOMB_MUNI":"TEJUTEPEQUE"}, {"CODI_MUNI":"162","CODI_DEPA":"09","NOMB_MUNI":"VILLA VICTORIA"}, {"CODI_MUNI":"163","CODI_DEPA":"10","NOMB_MUNI":"SAN VICENTE"}, {"CODI_MUNI":"164","CODI_DEPA":"10","NOMB_MUNI":"APASTEPEQUE"}, {"CODI_MUNI":"165","CODI_DEPA":"10","NOMB_MUNI":"GUADALUPE"}, {"CODI_MUNI":"166","CODI_DEPA":"10","NOMB_MUNI":"SAN CAYETANO ISTEPEQUE"}, {"CODI_MUNI":"167","CODI_DEPA":"10","NOMB_MUNI":"SAN ESTEBAN CATARINA"}, {"CODI_MUNI":"168","CODI_DEPA":"10","NOMB_MUNI":"SAN ILDEFONSO"}, {"CODI_MUNI":"169","CODI_DEPA":"10","NOMB_MUNI":"SAN LORENZO"}, {"CODI_MUNI":"170","CODI_DEPA":"10","NOMB_MUNI":"SAN SEBASTIAN"}, {"CODI_MUNI":"171","CODI_DEPA":"10","NOMB_MUNI":"SANTA CLARA"}, {"CODI_MUNI":"172","CODI_DEPA":"10","NOMB_MUNI":"SANTO DOMINGO"}, {"CODI_MUNI":"173","CODI_DEPA":"10","NOMB_MUNI":"TECOLUCA"}, {"CODI_MUNI":"174","CODI_DEPA":"10","NOMB_MUNI":"TEPETITAN"}, {"CODI_MUNI":"175","CODI_DEPA":"10","NOMB_MUNI":"VERAPAZ"}, {"CODI_MUNI":"176","CODI_DEPA":"11","NOMB_MUNI":"USULUTAN"}, {"CODI_MUNI":"177","CODI_DEPA":"11","NOMB_MUNI":"ALEGRIA"}, {"CODI_MUNI":"178","CODI_DEPA":"11","NOMB_MUNI":"BERLIN"}, {"CODI_MUNI":"179","CODI_DEPA":"11","NOMB_MUNI":"CALIFORNIA"}, {"CODI_MUNI":"180","CODI_DEPA":"11","NOMB_MUNI":"CONCEPCION BATRES"}, {"CODI_MUNI":"181","CODI_DEPA":"11","NOMB_MUNI":"EL TRIUNFO"}, {"CODI_MUNI":"182","CODI_DEPA":"11","NOMB_MUNI":"EREGUAYQUIN"}, {"CODI_MUNI":"183","CODI_DEPA":"11","NOMB_MUNI":"ESTANZUELAS"}, {"CODI_MUNI":"184","CODI_DEPA":"11","NOMB_MUNI":"JIQUILISCO"}, {"CODI_MUNI":"185","CODI_DEPA":"11","NOMB_MUNI":"JUCUAPA"}, {"CODI_MUNI":"186","CODI_DEPA":"11","NOMB_MUNI":"JUCUARAN"}, {"CODI_MUNI":"187","CODI_DEPA":"11","NOMB_MUNI":"MERCEDES UMA-A"}, {"CODI_MUNI":"188","CODI_DEPA":"11","NOMB_MUNI":"NUEVA GRANADA"}, {"CODI_MUNI":"189","CODI_DEPA":"11","NOMB_MUNI":"OZATLAN"}, {"CODI_MUNI":"190","CODI_DEPA":"11","NOMB_MUNI":"PUERTO EL TRIUNFO"}, {"CODI_MUNI":"191","CODI_DEPA":"11","NOMB_MUNI":"SAN AGUSTIN"}, {"CODI_MUNI":"192","CODI_DEPA":"11","NOMB_MUNI":"SAN BUENA VENTURA"}, {"CODI_MUNI":"193","CODI_DEPA":"11","NOMB_MUNI":"SAN DIONISIO"}, {"CODI_MUNI":"194","CODI_DEPA":"11","NOMB_MUNI":"SAN FRANCISCO JAVIER"}, {"CODI_MUNI":"195","CODI_DEPA":"11","NOMB_MUNI":"SANTA ELENA"}, {"CODI_MUNI":"196","CODI_DEPA":"11","NOMB_MUNI":"SANTA MARIA"}, {"CODI_MUNI":"197","CODI_DEPA":"11","NOMB_MUNI":"SANTIAGO DE MARIA"}, {"CODI_MUNI":"198","CODI_DEPA":"11","NOMB_MUNI":"TECAPAN"}, {"CODI_MUNI":"199","CODI_DEPA":"12","NOMB_MUNI":"SAN MIGUEL"}, {"CODI_MUNI":"200","CODI_DEPA":"12","NOMB_MUNI":"CAROLINA"}, {"CODI_MUNI":"201","CODI_DEPA":"12","NOMB_MUNI":"CIUDAD BARRIOS"}, {"CODI_MUNI":"202","CODI_DEPA":"12","NOMB_MUNI":"COMACARAN"}, {"CODI_MUNI":"203","CODI_DEPA":"12","NOMB_MUNI":"CHAPELTIQUE"}, {"CODI_MUNI":"204","CODI_DEPA":"12","NOMB_MUNI":"CHINAMECA"}, {"CODI_MUNI":"205","CODI_DEPA":"12","NOMB_MUNI":"CHIRILAGUA"}, {"CODI_MUNI":"206","CODI_DEPA":"12","NOMB_MUNI":"EL TRANSITO"}, {"CODI_MUNI":"207","CODI_DEPA":"12","NOMB_MUNI":"LOLOTIQUE"}, {"CODI_MUNI":"208","CODI_DEPA":"12","NOMB_MUNI":"MONCAGUA"}, {"CODI_MUNI":"209","CODI_DEPA":"12","NOMB_MUNI":"NUEVA GUADALUPE"}, {"CODI_MUNI":"210","CODI_DEPA":"12","NOMB_MUNI":"NUEVO EDEN DE SAN JUAN"}, {"CODI_MUNI":"211","CODI_DEPA":"12","NOMB_MUNI":"QUELEPA"}, {"CODI_MUNI":"212","CODI_DEPA":"12","NOMB_MUNI":"SAN ANTONIO DEL MOSCO"}, {"CODI_MUNI":"213","CODI_DEPA":"12","NOMB_MUNI":"SAN GERARDO"}, {"CODI_MUNI":"214","CODI_DEPA":"12","NOMB_MUNI":"SAN JORGE"}, {"CODI_MUNI":"215","CODI_DEPA":"12","NOMB_MUNI":"SAN LUIS DE LA REINA"}, {"CODI_MUNI":"216","CODI_DEPA":"12","NOMB_MUNI":"SAN RAFAEL ORIENTE"}, {"CODI_MUNI":"217","CODI_DEPA":"12","NOMB_MUNI":"SESORI"}, {"CODI_MUNI":"218","CODI_DEPA":"12","NOMB_MUNI":"ULUAZAPA"}, {"CODI_MUNI":"219","CODI_DEPA":"13","NOMB_MUNI":"SAN FRANCISCO GOTERA"}, {"CODI_MUNI":"220","CODI_DEPA":"13","NOMB_MUNI":"ARAMBALA"}, {"CODI_MUNI":"221","CODI_DEPA":"13","NOMB_MUNI":"CACAOPERA"}, {"CODI_MUNI":"222","CODI_DEPA":"13","NOMB_MUNI":"CORINTO"}, {"CODI_MUNI":"223","CODI_DEPA":"13","NOMB_MUNI":"CHILANGA"}, {"CODI_MUNI":"224","CODI_DEPA":"13","NOMB_MUNI":"DELICIAS DE CONCEPCION"}, {"CODI_MUNI":"225","CODI_DEPA":"13","NOMB_MUNI":"EL DIVISADERO"}, {"CODI_MUNI":"226","CODI_DEPA":"13","NOMB_MUNI":"EL ROSARIO"}, {"CODI_MUNI":"227","CODI_DEPA":"13","NOMB_MUNI":"GUALOCOCTI"}, {"CODI_MUNI":"228","CODI_DEPA":"13","NOMB_MUNI":"GUATAJIAGUA"}, {"CODI_MUNI":"229","CODI_DEPA":"13","NOMB_MUNI":"JOATECA"}, {"CODI_MUNI":"230","CODI_DEPA":"13","NOMB_MUNI":"JOCOAITIQUE"}, {"CODI_MUNI":"231","CODI_DEPA":"13","NOMB_MUNI":"JOCORO"}, {"CODI_MUNI":"232","CODI_DEPA":"13","NOMB_MUNI":"LOLOTIQUILLO"}, {"CODI_MUNI":"233","CODI_DEPA":"13","NOMB_MUNI":"MEANGUERA"}, {"CODI_MUNI":"234","CODI_DEPA":"13","NOMB_MUNI":"OSICALA"}, {"CODI_MUNI":"235","CODI_DEPA":"13","NOMB_MUNI":"PERQUIN"}, {"CODI_MUNI":"236","CODI_DEPA":"13","NOMB_MUNI":"SAN CARLOS"}, {"CODI_MUNI":"237","CODI_DEPA":"13","NOMB_MUNI":"SAN FERNANDO"}, {"CODI_MUNI":"238","CODI_DEPA":"13","NOMB_MUNI":"SAN ISIDRO"}, {"CODI_MUNI":"239","CODI_DEPA":"13","NOMB_MUNI":"SAN SIMON"}, {"CODI_MUNI":"240","CODI_DEPA":"13","NOMB_MUNI":"SENSEMBRA"}, {"CODI_MUNI":"241","CODI_DEPA":"13","NOMB_MUNI":"SOCIEDAD"}, {"CODI_MUNI":"242","CODI_DEPA":"13","NOMB_MUNI":"TOROLA"}, {"CODI_MUNI":"243","CODI_DEPA":"13","NOMB_MUNI":"YAMABAL"}, {"CODI_MUNI":"244","CODI_DEPA":"13","NOMB_MUNI":"YOLOAQUIN"}, {"CODI_MUNI":"245","CODI_DEPA":"14","NOMB_MUNI":"LA UNION"}, {"CODI_MUNI":"246","CODI_DEPA":"14","NOMB_MUNI":"ANAMOROS"}, {"CODI_MUNI":"247","CODI_DEPA":"14","NOMB_MUNI":"BOLIVAR"}, {"CODI_MUNI":"248","CODI_DEPA":"14","NOMB_MUNI":"CONCEPCION DE ORIENTE"}, {"CODI_MUNI":"249","CODI_DEPA":"14","NOMB_MUNI":"CONCHAGUA"}, {"CODI_MUNI":"250","CODI_DEPA":"14","NOMB_MUNI":"EL CARMEN"}, {"CODI_MUNI":"251","CODI_DEPA":"14","NOMB_MUNI":"EL SAUCE"}, {"CODI_MUNI":"252","CODI_DEPA":"14","NOMB_MUNI":"INTIPUCA"}, {"CODI_MUNI":"253","CODI_DEPA":"14","NOMB_MUNI":"LISLIQUE"}, {"CODI_MUNI":"254","CODI_DEPA":"14","NOMB_MUNI":"MEANGUERA"}, {"CODI_MUNI":"255","CODI_DEPA":"14","NOMB_MUNI":"NUEVA ESPARTA"}, {"CODI_MUNI":"256","CODI_DEPA":"14","NOMB_MUNI":"PASAQUINA"}, {"CODI_MUNI":"257","CODI_DEPA":"14","NOMB_MUNI":"POLOROS"}, {"CODI_MUNI":"258","CODI_DEPA":"14","NOMB_MUNI":"SAN ALEJO"}, {"CODI_MUNI":"259","CODI_DEPA":"14","NOMB_MUNI":"SAN JOSE"}, {"CODI_MUNI":"260","CODI_DEPA":"14","NOMB_MUNI":"SANTA ROSA DE LIMA"}, {"CODI_MUNI":"261","CODI_DEPA":"14","NOMB_MUNI":"YAYANTIQUE"}, {"CODI_MUNI":"262","CODI_DEPA":"14","NOMB_MUNI":"YUCUAIQUIN"}];

$(function() {
    verificarGPS();
    var loc = window.location.href;
    if (!loc.includes(APP.login)) {
        if (!isJsonString(getLS("usuario"))) {
            goto(APP.login);
        } else if (getLS("fechaActualizacion") != getFecha()) {
            localStorage.removeItem("usuario");
            goto(APP.login);
        }
    }else{
        if(!loc.includes("dashboard")){
            setInterval(function(){
                if(esHora()){
                    allow_exit=true;
                    goto("dashboard.html");
                }},300000);
        }
    }
    
    $(".actualizacion").html("Ultima Actualización: " + getLS("fechaActualizacion"));
});

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("clientes");
    localStorage.removeItem("rutas");
    
    
    goto(APP.login);
}

function goto(url) {
    window.location = url;
}

function getLS(name) {
    return window.localStorage.getItem(name);
}

function setLS(name, value) {
    if ((typeof value) != "string") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
}


function setMunicipios(codigo_depa,select,value){
    $(select).empty();
    MUNICIPIOS.forEach(function(item,i){
        if(item.CODI_DEPA==codigo_depa){
            if(value==item.CODI_MUNI){
                $(select).append("<option value='" + item.CODI_MUNI + "' selected>" + item.NOMB_MUNI+'</option>')
            }else{
                $(select).append("<option value='" + item.CODI_MUNI + "'>" + item.NOMB_MUNI+'</option>')
            }
        }
    });
}

function getMunicipio(codigo_muni){
    for(var i=0;i<MUNICIPIOS.length;i++){
        if(codigo_muni==MUNICIPIOS[i].CODI_MUNI){
            return MUNICIPIOS[i];
        }
    }
    return {};
}

function filtrarListado(idInput, claseListado) {
    var val = $("#" + idInput).val();
    if (val != "") {
        val = val.toUpperCase();
        val = ".*" + val.replace(" ", ".*") + ".*";
        var re = new RegExp(val, "g");
        $("." + claseListado).each(function(i, item) {
            if ($(item).html().match(re)) {
                $(item).css("display", "block");
            } else {
                $(item).css("display", "none");
            }
        });
    } else {
        $("." + claseListado).css("display", "none");
    }
}

function isJsonString(str) {
    if (str == null) {
        return false;
    }
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function alerta(mensaje) {
    $("#modalInfoText").html(mensaje);
    $("#infoModal").modal('show');
}

function checkInternet() {
    try{
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            return false;
        } else {
            
            return true; }
    }catch(ex){
        return true;
    }
    
}


function checkConnection(call_back) {
    $.ajax({
        url: APP.url+"check.php?code="+getUuid(),
        error: function(){
            call_back(false);
        },
        success: function(){
            call_back(true);
        },
        timeout: 10000 // sets timeout to 10 seconds
    });
}

function toDataTable(selector) {
    $(selector).DataTable({
        "language": { "url": "vendor/datatables/spanish.json" }
    });
}


function getIdUsuario() {
    var usuario = JSON.parse(getLS("usuario"));
    return usuario.idUsuario;
}

function getFecha() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Enero es 0!
    var yyyy = today.getFullYear();
    //Añado 0 cuando es menor a 10
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }

    return dd + '/' + mm + '/' + yyyy;
}

function round(num) {
    return Math.round(num * 100000) / 100000;
}

function verificarGPS(lat, long) {
    try {
        navigator.geolocation.getCurrentPosition(function(position) {
            APP.latitud = position.coords.latitude;
            APP.longitud = position.coords.longitude;

        });
    } catch (e) {
        console.log(e);
    }

}

function areWeNear(cliente, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * cliente.LATITUD / 180.0) * ky;
    var dx = Math.abs(APP.longitud - cliente.LONGITUD) * kx;
    var dy = Math.abs(APP.latitud - cliente.LATITUD) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}


function getDistance(cliente) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * cliente.LATITUD / 180.0) * ky;
    var dx = Math.abs(APP.longitud - cliente.LONGITUD) * kx;
    var dy = Math.abs(APP.latitud - cliente.LATITUD) * ky;
    return Math.sqrt(dx * dx + dy * dy);
}

function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}


function getUuid() {
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return uuid;
};


function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}




function esHora(){
    var date=new Date();
    var hora=date.getHours();
    var minutos=date.getMinutes();
    minutos=minutos+(hora*60);
    var usuario=JSON.parse(getLS("usuario"));
    var sincronizar=parseInt(usuario.minutodia);
    if(minutos>=sincronizar){
        return true;
    }else{
        return false;
    }
}














/*
 * CryptoJS
 * Utilidad para obtener el codigo MD5 de un string
 */


var CryptoJS = CryptoJS || function(s, p) {
    var m = {},
        l = m.lib = {},
        n = function() {},
        r = l.Base = { extend: function(b) { n.prototype = this; var h = new n;
                b && h.mixIn(b);
                h.hasOwnProperty("init") || (h.init = function() { h.$super.init.apply(this, arguments) });
                h.init.prototype = h;
                h.$super = this; return h }, create: function() { var b = this.extend();
                b.init.apply(b, arguments); return b }, init: function() {}, mixIn: function(b) { for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]);
                b.hasOwnProperty("toString") && (this.toString = b.toString) }, clone: function() { return this.init.prototype.extend(this) } },
        q = l.WordArray = r.extend({
            init: function(b, h) { b = this.words = b || [];
                this.sigBytes = h != p ? h : 4 * b.length },
            toString: function(b) { return (b || t).stringify(this) },
            concat: function(b) { var h = this.words,
                    a = b.words,
                    j = this.sigBytes;
                b = b.sigBytes;
                this.clamp(); if (j % 4)
                    for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4);
                else if (65535 < a.length)
                    for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2];
                else h.push.apply(h, a);
                this.sigBytes += b; return this },
            clamp: function() {
                var b = this.words,
                    h = this.sigBytes;
                b[h >>> 2] &= 4294967295 <<
                    32 - 8 * (h % 4);
                b.length = s.ceil(h / 4)
            },
            clone: function() { var b = r.clone.call(this);
                b.words = this.words.slice(0); return b },
            random: function(b) { for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0); return new q.init(h, b) }
        }),
        v = m.enc = {},
        t = v.Hex = {
            stringify: function(b) { var a = b.words;
                b = b.sigBytes; for (var g = [], j = 0; j < b; j++) { var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                    g.push((k >>> 4).toString(16));
                    g.push((k & 15).toString(16)) } return g.join("") },
            parse: function(b) {
                for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j,
                    2), 16) << 24 - 4 * (j % 8);
                return new q.init(g, a / 2)
            }
        },
        a = v.Latin1 = { stringify: function(b) { var a = b.words;
                b = b.sigBytes; for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return g.join("") }, parse: function(b) { for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new q.init(g, a) } },
        u = v.Utf8 = { stringify: function(b) { try { return decodeURIComponent(escape(a.stringify(b))) } catch (g) { throw Error("Malformed UTF-8 data"); } }, parse: function(b) { return a.parse(unescape(encodeURIComponent(b))) } },
        g = l.BufferedBlockAlgorithm = r.extend({
            reset: function() { this._data = new q.init;
                this._nDataBytes = 0 },
            _append: function(b) { "string" == typeof b && (b = u.parse(b));
                this._data.concat(b);
                this._nDataBytes += b.sigBytes },
            _process: function(b) { var a = this._data,
                    g = a.words,
                    j = a.sigBytes,
                    k = this.blockSize,
                    m = j / (4 * k),
                    m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0);
                b = m * k;
                j = s.min(4 * b, j); if (b) { for (var l = 0; l < b; l += k) this._doProcessBlock(g, l);
                    l = g.splice(0, b);
                    a.sigBytes -= j } return new q.init(l, j) },
            clone: function() {
                var b = r.clone.call(this);
                b._data = this._data.clone();
                return b
            },
            _minBufferSize: 0
        });
    l.Hasher = g.extend({
        cfg: r.extend(),
        init: function(b) { this.cfg = this.cfg.extend(b);
            this.reset() },
        reset: function() { g.reset.call(this);
            this._doReset() },
        update: function(b) { this._append(b);
            this._process(); return this },
        finalize: function(b) { b && this._append(b); return this._doFinalize() },
        blockSize: 16,
        _createHelper: function(b) { return function(a, g) { return (new b.init(g)).finalize(a) } },
        _createHmacHelper: function(b) {
            return function(a, g) {
                return (new k.HMAC.init(b,
                    g)).finalize(a)
            }
        }
    });
    var k = m.algo = {};
    return m
}(Math);
(function(s) {
    function p(a, k, b, h, l, j, m) { a = a + (k & b | ~k & h) + l + m; return (a << j | a >>> 32 - j) + k }

    function m(a, k, b, h, l, j, m) { a = a + (k & h | b & ~h) + l + m; return (a << j | a >>> 32 - j) + k }

    function l(a, k, b, h, l, j, m) { a = a + (k ^ b ^ h) + l + m; return (a << j | a >>> 32 - j) + k }

    function n(a, k, b, h, l, j, m) { a = a + (b ^ (k | ~h)) + l + m; return (a << j | a >>> 32 - j) + k }
    for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0;
    q = q.MD5 = t.extend({
        _doReset: function() { this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]) },
        _doProcessBlock: function(g, k) {
            for (var b = 0; 16 > b; b++) { var h = k + b,
                    w = g[h];
                g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360 }
            var b = this._hash.words,
                h = g[k + 0],
                w = g[k + 1],
                j = g[k + 2],
                q = g[k + 3],
                r = g[k + 4],
                s = g[k + 5],
                t = g[k + 6],
                u = g[k + 7],
                v = g[k + 8],
                x = g[k + 9],
                y = g[k + 10],
                z = g[k + 11],
                A = g[k + 12],
                B = g[k + 13],
                C = g[k + 14],
                D = g[k + 15],
                c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                c = p(c, d, e, f, h, 7, a[0]),
                f = p(f, c, d, e, w, 12, a[1]),
                e = p(e, f, c, d, j, 17, a[2]),
                d = p(d, e, f, c, q, 22, a[3]),
                c = p(c, d, e, f, r, 7, a[4]),
                f = p(f, c, d, e, s, 12, a[5]),
                e = p(e, f, c, d, t, 17, a[6]),
                d = p(d, e, f, c, u, 22, a[7]),
                c = p(c, d, e, f, v, 7, a[8]),
                f = p(f, c, d, e, x, 12, a[9]),
                e = p(e, f, c, d, y, 17, a[10]),
                d = p(d, e, f, c, z, 22, a[11]),
                c = p(c, d, e, f, A, 7, a[12]),
                f = p(f, c, d, e, B, 12, a[13]),
                e = p(e, f, c, d, C, 17, a[14]),
                d = p(d, e, f, c, D, 22, a[15]),
                c = m(c, d, e, f, w, 5, a[16]),
                f = m(f, c, d, e, t, 9, a[17]),
                e = m(e, f, c, d, z, 14, a[18]),
                d = m(d, e, f, c, h, 20, a[19]),
                c = m(c, d, e, f, s, 5, a[20]),
                f = m(f, c, d, e, y, 9, a[21]),
                e = m(e, f, c, d, D, 14, a[22]),
                d = m(d, e, f, c, r, 20, a[23]),
                c = m(c, d, e, f, x, 5, a[24]),
                f = m(f, c, d, e, C, 9, a[25]),
                e = m(e, f, c, d, q, 14, a[26]),
                d = m(d, e, f, c, v, 20, a[27]),
                c = m(c, d, e, f, B, 5, a[28]),
                f = m(f, c,
                    d, e, j, 9, a[29]),
                e = m(e, f, c, d, u, 14, a[30]),
                d = m(d, e, f, c, A, 20, a[31]),
                c = l(c, d, e, f, s, 4, a[32]),
                f = l(f, c, d, e, v, 11, a[33]),
                e = l(e, f, c, d, z, 16, a[34]),
                d = l(d, e, f, c, C, 23, a[35]),
                c = l(c, d, e, f, w, 4, a[36]),
                f = l(f, c, d, e, r, 11, a[37]),
                e = l(e, f, c, d, u, 16, a[38]),
                d = l(d, e, f, c, y, 23, a[39]),
                c = l(c, d, e, f, B, 4, a[40]),
                f = l(f, c, d, e, h, 11, a[41]),
                e = l(e, f, c, d, q, 16, a[42]),
                d = l(d, e, f, c, t, 23, a[43]),
                c = l(c, d, e, f, x, 4, a[44]),
                f = l(f, c, d, e, A, 11, a[45]),
                e = l(e, f, c, d, D, 16, a[46]),
                d = l(d, e, f, c, j, 23, a[47]),
                c = n(c, d, e, f, h, 6, a[48]),
                f = n(f, c, d, e, u, 10, a[49]),
                e = n(e, f, c, d,
                    C, 15, a[50]),
                d = n(d, e, f, c, s, 21, a[51]),
                c = n(c, d, e, f, A, 6, a[52]),
                f = n(f, c, d, e, q, 10, a[53]),
                e = n(e, f, c, d, y, 15, a[54]),
                d = n(d, e, f, c, w, 21, a[55]),
                c = n(c, d, e, f, v, 6, a[56]),
                f = n(f, c, d, e, D, 10, a[57]),
                e = n(e, f, c, d, t, 15, a[58]),
                d = n(d, e, f, c, B, 21, a[59]),
                c = n(c, d, e, f, r, 6, a[60]),
                f = n(f, c, d, e, z, 10, a[61]),
                e = n(e, f, c, d, j, 15, a[62]),
                d = n(d, e, f, c, x, 21, a[63]);
            b[0] = b[0] + c | 0;
            b[1] = b[1] + d | 0;
            b[2] = b[2] + e | 0;
            b[3] = b[3] + f | 0
        },
        _doFinalize: function() {
            var a = this._data,
                k = a.words,
                b = 8 * this._nDataBytes,
                h = 8 * a.sigBytes;
            k[h >>> 5] |= 128 << 24 - h % 32;
            var l = s.floor(b /
                4294967296);
            k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
            k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
            a.sigBytes = 4 * (k.length + 1);
            this._process();
            a = this._hash;
            k = a.words;
            for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            return a
        },
        clone: function() { var a = t.clone.call(this);
            a._hash = this._hash.clone(); return a }
    });
    r.MD5 = t._createHelper(q);
    r.HmacMD5 = t._createHmacHelper(q)
})(Math);