import Swal from "sweetalert2";

const popupSuccess = (successType, falseLogout) => {
    let title = "";
    if(successType === "new" || falseLogout === false){
        title = "Great! Your account has been successfully created...";
    } else if(successType === "removed"){
        title = "Successfully removed this event...";
    } else if(successType === "login"){
        title = "Congrats! Successfully logged in";
    } else if(successType === "new event"){
        title = "Wow! Successfully Added Student Info 😮";
    } else if(successType === "logout"){
        title = "Successfully log Out!!!";
    }else if(successType === "submit"){
        title = "Congrats! We've just received your order...👍";
    }
    else if (successType === "update") {
        title = "Successfully change this Student Info";
      }
    return Swal.fire({
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 2000,
        padding: "1rem 2rem 3rem",
    })
};

export default popupSuccess;