// Get the forms element
const join_now_form = document.getElementById("join_now_form");
const care_form = document.getElementById("care_form");

// join_now phone
var input = document.querySelector("#phone_number");
const iti = intlTelInput(input, {
    utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                callback(data.country_code);
            })
            .catch(function () {
                callback("us");
            });
    },
});

iti.promise
    .then(() => {
        // الحصول على بيانات الدولة
        const countryData = iti.getSelectedCountryData();

        // الحصول على رقم الهاتف
        const phoneNumber = iti.getNumber();

        // تعيين القيمة النهائية لمدخل الإدخال
        input.value = "+" + countryData.dialCode + phoneNumber;
    })
    .catch((err) => {
        alert("حدث خطأ أثناء تحميل المكتبة:", err);
    });

// care phone
var care_input = document.querySelector("#care_phone_number");
const care_iti = intlTelInput(care_input, {
    utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                callback(data.country_code);
            })
            .catch(function () {
                callback("us");
            });
    },
});

care_iti.promise
    .then(() => {
        // الحصول على بيانات الدولة
        const care_countryData = care_iti.getSelectedCountryData();

        // الحصول على رقم الهاتف
        const care_phoneNumber = care_iti.getNumber();

        // تعيين القيمة النهائية لمدخل الإدخال
        care_input.value = "+" + care_countryData.dialCode + care_phoneNumber;
    })
    .catch((err) => {
        alert("حدث خطأ أثناء تحميل المكتبة:", err);
    });

// Add a submit event listener to the join_now_form
join_now_form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent the form from submitting and refreshing the page

    const data = Object.fromEntries(new FormData(e.target).entries());

    if (data.first_name != "" && data.last_name != "") {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        var requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        let response = await fetch(
            "https://mubadarah-x674v.ondigitalocean.app/form/form_join/",
            requestOptions
        );

        let result = await response.json();

        console.log(result, "res");

        if (result.data === "failed") {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "خطا",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            $("#join_now_modal").modal("hide");

            join_now_form.reset();

            Swal.fire({
                icon: "success",
                iconColor: "#f7941d",
                title: "أهلاً بك إلى مبادرة مليون رائد أعمال رقمي عربي",
                text: "لقد تم إرسال رسالة إلى بريدك الإلكتروني ليتسنى لك تفعيل تقديم الطلب. يرجى التأكد من بريدك الإلكتروني واتباع التعليمات (انتبه إن البريد المرسل لك قد يكون في قائمة الرسائل غير المرغوب فيها  (Spam)",
                showConfirmButton: false,
                timer: 9500,
            });
        }
    }
});

// Add a submit event listener to the care
care_form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent the form from submitting and refreshing the page

    const data = Object.fromEntries(new FormData(e.target).entries());

    if (data.first_name != "" && data.last_name != "") {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        var requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        let response = await fetch(
            "https://mubadarah-x674v.ondigitalocean.app/form/form_care/",
            requestOptions
        );

        let result = await response.json();

        console.log(result, "res");

        if (result.data === "failed") {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "خطا",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            $("#care_request_modal").modal("hide");

            care_form.reset();

            Swal.fire({
                icon: "success",
                title: "تم استلام طلبك، ",
                text: "نشكر اهتمامكم بالرعاية والمساهمة في المبادرة وسيتم التواصل معكم من خلال فرق العمل قريبًا ",
                showConfirmButton: false,
                timer: 9500,
            });
        }
    }
});

// $(document).ready(function () {
//     $("#addemail").modal("show");
// });

$("#close_addemail").on("click", () => {
    $("#addemail").modal("hide");
});
