
// function Disable(c) {
//     const a = $(`.${c}`);
//     if ($(`.${c}`)[0].checked) {
//       for (let i = 0; i < a.length; i++) {
//         if (i !== 0) {
//           a[i].disabled = true;
//           a[i].checked = false;
//         }
//       }
//       if (c === "congenital") {
//         $(".congenital-txt").attr("disabled", true);
//         $(".congenital-txt").val("");
//       } else if (c === "sick") {
//         $(".sick-txt").attr("disabled", true);
//         $(".sick-txt").val("");
//       } else if (c === "accident") {
//         $(".accident-txt").attr("disabled", true);
//         $(".accident-txt").val("");
//       }
//     } else {
//       for (let i = 0; i < a.length; i++) {
//         if (i !== 0) {
//           a[i].disabled = false;
//         }
//       }
//       if (c === "congenital") {
//         $(".congenital-txt").attr("disabled", false);
//       } else if (c === "sick") {
//         $(".sick-txt").attr("disabled", false);
//       } else if (c === "accident") {
//         $(".accident-txt").attr("disabled", false);
//       }
//     }
//   }
  
//   $(".department").change((e) => {
//     if ($(".department")[0].checked) {
//       $("#ot").attr("disabled", false);
//     } else {
//       $("#ot").attr("disabled", true);
//       $("#ot").val("");
//     }
//   });
  
//   $(".drinking_alcohol").change((e) => {
//     const a = $(".drinking_alcohol2");
//     if (!$(".drinking_alcohol")[0].checked) {
//       for (let i = 0; i < a.length; i++) {
//         a[i].disabled = false;
//       }
//     } else {
//       for (let i = 0; i < a.length; i++) {
//         a[i].disabled = true;
//         a[i].checked = false;
//       }
//     }
//   });
  
//   $(".smoke_often1").change((e) => {
//     if (!$(".smoke_often1")[0].checked) {
//       $("#smoke_often1").attr("disabled", false);
//     } else {
//       $("#smoke_often1").attr("disabled", true);
//       $("#smoke_often1").val("");
//     }
//   });
  
//   $(".debt_information").change((e) => {
//     if (!$(".debt_information")[0].checked) {
//       $("#debt_information").attr("disabled", false);
//     } else {
//       $("#debt_information").attr("disabled", true);
//       $("#debt_information").val("");
//     }
//   });
  
//   $("#weight").change(() => {
//     if ($("#weight").val() < 1) {
//       $("#weight").val(1);
//     }
//     if (
//       $("#weight").val() !== "" &&
//       $("#height").val() !== "" &&
//       $("#height").val() > 0
//     ) {
//       let BMI = (
//         $("#weight").val() / Math.pow($("#height").val() / 100, 2)
//       ).toFixed(2);
//       $("#BMI").val(BMI);
//       set();
//     }
//   });
  
//   $("#height").change(() => {
//     if ($("#height").val() < 90) {
//       $("#height").val(90);
//     }
//     if (
//       $("#weight").val() !== "" &&
//       $("#height").val() !== "" &&
//       $("#height").val() > 0
//     ) {
//       let BMI = (
//         $("#weight").val() / Math.pow($("#height").val() / 100, 2)
//       ).toFixed(2);
//       $("#BMI").val(BMI);
//       set();
//     }
//   });
  
//   function set() {
//     const BMI = $("#BMI").val();
//     if (BMI < 18.5) {
//       $("#proportion").val("น้ำหนักต่ำกว่าเกณฑ์");
//       proportion = "น้ำหนักต่ำกว่าเกณฑ์";
//       $("#proportion").css("color", "lime");
//     } else if (BMI >= 18.5 && BMI < 22.9) {
//       $("#proportion").val("สมส่วน");
//       proportion = "สมส่วน";
//       $("#proportion").css("color", "green");
//     } else if (BMI >= 23 && BMI < 24.9) {
//       $("#proportion").val("ท้วม");
//       proportion = "ท้วม";
//       $("#proportion").css("color", "yellow");
//     } else if (BMI >= 25 && BMI < 29.9) {
//       $("#proportion").val("โรคอ้วน");
//       proportion = "โรคอ้วน";
//       $("#proportion").css("color", "orange");
//     } else if (BMI > 30) {
//       $("#proportion").val("โรคอ้วนอันตราย");
//       proportion = "โรคอ้วนอันตราย";
//       $("#proportion").css("color", "red");
//     }
//   }
  
  $("#TWH01").submit(function (e) {
    let isNumber = ["age"];
    e.preventDefault();
    Swal.fire({
      icon: "question",
      title: "ยืนยันการบันทึกข้อมูล",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "ยืนยัน",
      denyButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {};
        let sumIdentity = 0;
        let sumFamily = 0;
        let sumIntellect = 0;
        let sumFriend = 0;
        let sumCommunity = 0;
        $("#TWH01")
          .serializeArray()
          .forEach((e) => {
            if (isNumber.find((k) => k == e.name)) {
              data[e.name] = Number(e.value);
            } else {
              data[e.name] = e.value;
            }
          });
        for (let i = 1; i <= 15; i++) {
            sumIdentity += Number(data[`identity${i}`]);
        }
        for (let i = 1; i <= 8; i++) {
            sumFamily += Number(data[`family${i}`]);
        }
        for (let i = 1; i <= 11; i++) {
            sumIntellect += Number(data[`intellect${i}`]);
        }
        for (let i = 1; i <= 6; i++) {
            sumFriend += Number(data[`friend${i}`]);
        }
        for (let i = 1; i <= 8; i++) {
            sumCommunity += Number(data[`community${i}`]);
        }
        // data.BMI = Number($("#BMI").val());
        // data.sumStrain = sumStrain;
        // data.sumHappy = sumHappy;
        // data.sumMemory = sumMemory;
        // data.proportion = proportion;
        fetch(
          "https://smartcity.onrender.com/lifesurvey/addlifesurvey",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        ).then(function (response) {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลเสร็จสิ้น",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "ตกลง",
            timer: 3000,
          }).then((e) => {
            let pop = `<div class="card">
                          <div class="card-body ">
                              <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                                  คะแนนพลังตัวตน 77.78 %
                                  </h3>
                                  <table id="customers1" style="width:100%">
                                      <tr>
                                          <th>ร้อยละของคะแนน</th>
                                          <th>ระดับต้นทุนชีวิตพลังตัวตน</th>
                                      </tr>
                                      <tr>
                                          <td class="radio">80 คะแนนขึ้นไป </td>
                                          <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                      </tr>
                                      <tr>
                                          <td class="radio">70 - 80 คะแนน</td>
                                          <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                      </tr>
                                      <tr>r
                                          <td class="radio">60 - 70 คะแนน</td>
                                          <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างพลังตัวตนเพิ่มเติม</td>
                                    </tr>
                                      <tr>
                                          <td class="radio">น้อยกว่า 60 คะแนน</td>
                                          <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างพลังตัวตนให้มากขึ้น</td>
                                    </tr>
                                  </table>
                          </div>
                       </div>
               
                        <div class="card">
                            <div class="card-body">
                                <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                                    คะแนนพลังครอบครัว 70.83 %</h3>
                                    <table id="customers1">
                                        <tr>
                                            <th>ร้อยละของคะแนน</th>
                                            <th>ระดับต้นทุนชีวิตพลังครอบครัว</th>
                                        </tr>
                                        <tr>
                                          <td class="radio">80 คะแนนขึ้นไป </td>
                                          <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                         </tr>
                                        <tr>
                                          <td class="radio">70 - 80 คะแนน</td>
                                          <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                       </tr>
                                      <tr>
                                          <td class="radio">60 - 70 คะแนน</td>
                                          <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างพลังครอบครัวเพิ่มเติม</td>
                                    </tr>
                                      <tr>
                                          <td class="radio">น้อยกว่า 60 คะแนน</td>
                                          <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างพลังครอบครัวให้มากขึ้น</td>
                                    </tr>
                                    </table>
                            </div>
                        </div>

                         <div class="card">
                           <div class="card-body ">
                               <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                                   คะแนนพลังสร้างปัญญา 87.88 %</h3>
                                   <table id="customers1">
                                       <tr>
                                           <th>ร้อยละของคะแนน</th>
                                           <th>ระดับต้นทุนชีวิตพลังสร้างปัญญา</th>
                                       </tr>
                                       <tr>
                                           <td class="radio">80 คะแนนขึ้นไป </td>
                                           <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                       </tr>
                                       <tr>
                                           <td class="radio">70 - 80 คะแนน</td>
                                           <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                       </tr>
                                       <tr>
                                           <td class="radio">60 - 70 คะแนน</td>
                                           <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างพลังสร้างปัญญาเพิ่มเติม</td>
                                     </tr>
                                       <tr>
                                           <td class="radio">น้อยกว่า 60 คะแนน</td>
                                           <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างพลังสร้างปัญญาให้มากขึ้น</td>
                                     </tr>
                                   </table>
                           </div>
                        </div>

                        <div class="card">
                          <div class="card-body">
                              <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                                  คะแนนพลังเพื่อนและกิจกรรม 66.67 %</h3>
                                  <table id="customers1">
                                      <tr>
                                          <th >ร้อยละของคะแนน</th>
                                          <th>ระดับต้นทุนชีวิตพลังเพื่อนและกิจกรรม</th> 
                                      </tr>
                                      <tr>
                                          <td class="radio">80 คะแนนขึ้นไป</td>
                                          <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                         </tr>
                                        <tr>
                                          <td class="radio">70 - 80 คะแนน</td>
                                          <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                       </tr>
                                      <tr>
                                          <td class="radio">60 - 70 คะแนน</td>
                                          <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างพลังเพื่อนและกิจกรรมเพิ่มเติม</td>
                                    </tr>
                                      <tr>
                                          <td class="radio">น้อยกว่า 60 คะแนน</td>
                                          <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างพลังเพื่อนและกิจกรรมให้มากขึ้น</td>
                                    </tr>
                                  </table>
                          </div>
                      </div>
                      <div class="card">
                          <div class="card-body ">
                              <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                                  คะแนนพลังชุมชน 83.33 %</h3>
                                  <table id="customers1">
                                      <tr>
                                          <th style="width:30%">ร้อยละของคะแนน</th>
                                          <th style="width:70%">ระดับต้นทุนชีวิตพลังชุมชน</th>
                                      </tr>
                                      <tr>
                                          <td class="radio">80 คะแนนขึ้นไป </td>
                                          <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                      </tr>
                                      <tr>
                                          <td class="radio">70 - 80 คะแนน</td>
                                          <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                      </tr>
                                      <tr>
                                          <td class="radio">60 - 70 คะแนน</td>
                                          <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างพลังชุมชนเพิ่มเติม</td>
                                    </tr>
                                      <tr>
                                          <td class="radio">น้อยกว่า 60 คะแนน</td>
                                          <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างพลังชุมชนให้มากขึ้น</td>
                                    </tr>
                                  </table>
                          </div>
                       </div>
                       
                       <div class="card">
                          <div class="card-body ">
                              <h3 class="d-flex align-items-center" style="color: blue; flex-direction: column;">
                              คะแนนรวม ระดับต้นทุนชีวิต 78.47 %</h3>
                                  <table id="customers1">
                                      <tr>
                                          <th>ร้อยละของคะแนน</th>
                                          <th>ระดับต้นทุนชีวิต</th>
                                      </tr>
                                      <tr>
                                          <td class="radio">80 คะแนนขึ้นไป</td>
                                          <td class="radio" style="color: #006600;">อยู่ในเกณฑ์ดีมาก</td>
                                      </tr>
                                      <tr>
                                          <td class="radio">70 - 80 คะแนน</td>
                                          <td class="radio" style="color: #0033FF;">อยู่ในเกณฑ์ดี</td>
                                      </tr>
                                      <tr>
                                          <td class="radio">60 - 70 คะแนน</td>
                                          <td class="radio" style="color: #FF6600;">อยู่ในเกณฑ์ปานกลาง และควรเสริมสร้างต้นทุนชีวิตเพิ่มเติม</td>
                                    </tr>
                                      <tr>
                                          <td class="radio">น้อยกว่า 60 คะแนน</td>
                                          <td class="radio" style="color: #FF0000;">อยู่ในเกณฑ์ค่อนข้างน้อย และควรเพิ่มหรือเสริมสร้างต้นทุนชีวิตให้มากขึ้น</td>
                                    </tr>
                                  </table>
                          </div>
                       </div>
                       `;
            Swal.fire({
              html: pop,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "ตกลง",
            }).then((e) => {
              location.reload();
            });
          });
        });
      }
    });
  });
  