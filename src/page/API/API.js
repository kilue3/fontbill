const Api = (props) => {

    //let path = "http://localhost/flashwork_api/public/";
    let path = "http://localhost/Mback/public/";
    
    switch (props) {
        // import api from '../../api/linkapi';
        // -------------------- Category -----------------------
        case 'Login': return path + "Login";
        case 'Showlistnameusers': return path + "allusers";
        case 'Info_user': return path + "infouser/";
        case 'Delectuser': return path + "delectuser/";
        case 'Repassword': return path + "repassword/";
        case 'Registerusers': return path + "addusers";
        case 'Opbill': return path + "opbill";
        case 'Checkdate': return path + "checkdate";
        case 'Billend': return path + "updateEndbill";
        case 'Dateshows': return path + "opbilldateshow";

        
        case 'Storelist': return path + "storelist";
        case 'Findstore': return path + "findstore/";
        case 'Delectstore': return path + "delectstore/";
        case 'Resetpassstore': return path + "Resetpassstore/";
        case 'AddStore': return path + "addStore";

        
        
        

        default: return "";
    }
}


export default Api;