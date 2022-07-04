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

        
        

        default: return "";
    }
}


export default Api;