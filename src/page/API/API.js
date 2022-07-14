const Api = (props) => {
  //let path = "http://localhost/flashwork_api/public/";
  let path = "http://localhost/Mback/public/";
  let uploads = "http://localhost/Mback/";
  switch (props) {
    // import api from '../../api/linkapi';
    // -------------------- Category -----------------------
    case "Login":
      return path + "Login";
    case "Storelogin":
      return path + "Storelogin";

    case "Showlistnameusers":
      return path + "allusers";
    case "Allnormaluser":
      return path + "allnormaluser";

    case "Info_user":
      return path + "infouser/";
    case "Delectuser":
      return path + "delectuser/";
    case "Repassword":
      return path + "repassword/";
    case "Registerusers":
      return path + "addusers";
    case "Opbill":
      return path + "opbill";
    case "Checkdate":
      return path + "checkdate";
    case "Billend":
      return path + "updateEndbill";
    case "Dateshows":
      return path + "opbilldateshow";
    case "Today":
      return path + "selecttoday";
    case "Addbills":
      return path + "addbill";
    case "Editamount":
      return path + "editamountbill/";
    case "Addfire":
      return path + "addfile/";
    case "Listfile":
      return path + "listfile/";
    case "Delectfile":
      return path + "Delectfile/";
    case "Delectbills":
      return path + "Delectbills/";

    case "Storelist":
      return path + "storelist";
    case "Findstore":
      return path + "findstore/";
    case "Delectstore":
      return path + "delectstore/";
    case "Resetpassstore":
      return path + "Resetpassstore/";
    case "AddStore":
      return path + "addStore";
    case "BilllistAtive":
      return path + "billlistative/";
    case "Billid":
      return path + "billid/";
    case "Sentapprove":
      return path + "sentapprove/";
    case "Movefile":
      return path + "movefiles/";

    case "Findcmbill":
      return path + "findcmbill/";
    case "Billlist":
      return path + "billlist";
      case "Billpasslist":
        return path + "billpasslist";
 // case "Billinmonth":
    //   return path + "Billinmonth";
    case "Approve":
      return path + "approve/";
    
    case "Uploadfolder":
      return uploads + "img/upload/";

    default:
      return "";
  }
};

export default Api;
