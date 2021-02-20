$(document).ready(function () {
  var sourceId;
  var cohortId;
  var deviceId;
  var total = "";
  var trHTML = "";

  var totalUsers = 0;
  var totalOrders = 0;
  var totalConvRate = 0;
  var totalRevenue = 0;
  var totalAvgOrdValue = 0;
  var totalCost = 0;
  var totalCostPerUser = 0;
  var totalCustAcqCost = 0;
  var totalROAS = 0;

  var countConvRate = 0;
  var countCostPerUser = 0;
  var countCustAcqCost = 0;

  var intUsers = 0;
  var intOrders = 0;
  var intConvRate = 0;
  var intRevenue = 0;
  var intAvgOrdValue = 0;
  var intCost = 0;
  var intCostPerUser = 0;
  var intCustAcqCost = 0;
  var intROAS = 0;

  var count = 0;

  $.ajax({
    url: "table.json",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
  }).done(function (data) {
    //   --------------------------------
    // -------  Source starts-----------

    for (var i = 0; i < data.length - 1; i += 9) {
      count++;

      intUsers = parseFloat(data[i].Users.replace(",", ""));
      intOrders = parseFloat(data[i].Orders);
      intConvRate = parseFloat(data[i]["Conversion Rate"].replace("%", ""));
      intRevenue = parseFloat(data[i].Revenue.replace(",", ""));
      intAvgOrdValue = parseFloat(data[i]["Avg. Order Value"]);
      intCost = parseFloat(data[i].Cost.replace(",", ""));
      intCostPerUser = parseFloat(data[i]["Cost per User"]);
      intCustAcqCost = parseFloat(data[i]["Customer Acquisition Cost"]);
      intROAS = parseFloat(data[i].ROAS.replace("%", ""));

      totalUsers += intUsers;
      totalOrders += intOrders;
      totalConvRate += intConvRate;
      totalRevenue += intRevenue;
      totalAvgOrdValue += intAvgOrdValue;
      totalCost += intCost;
      totalCostPerUser += intCostPerUser;
      totalCustAcqCost += intCustAcqCost;
      totalROAS += intROAS;

      countNoNull(intConvRate, intCostPerUser, intCustAcqCost);

      sourceId = i;
      trHTML +=
        `<div class=" sourceStyle sourceSelector row"><div class="col-lg-3 source d-sm-flex align-self-start justify-content-start" ><span class=" ">
        <button type="button" class="btn btn-sm sourceBtn" data-bs-toggle="collapse" aria-expanded="false" data-bs-target=".cohort-` +
        data[i].Source +
        `">&#8744</button>` +
        data[i].Source +
        `</span><span class=""></span><span class=""></span></div>`;
      allInfo(i, "divSource");
      // ----------Source ends----------
      // --------------------------
      // ----------Cohort starts---------

      for (var j = i + 1; j <= i + 5; j += 4) {
        cohortId = j;
        trHTML +=
          `<div  class=" cohort row collapse cohort-` +
          data[i].Source +
          `"><div data-cohort-id="` +
          cohortId +
          `"  class=" cohortStyle d-flex align-self-center text-center align-middle col-lg-3" ><span class="flex-even"></span><span class="flex-even"><button type="button" class="btn btn-sm cohortBtn " data-bs-toggle="collapse" aria-expanded="false" data-bs-target=".cohort-id-` +
          cohortId +
          `">&#8744</button>` +
          data[j].cohort +
          `</span><span class="flex-even"></span></div>`;
        allInfo(j, "divCohort");
        // -----------COHORT ENDS-----------
        //   ===============================
        // -----------DEVICE STARTS----------
        for (var z = j + 1; z <= j + 3; z++) {
          deviceId = z;
          trHTML +=
            `<div class="device row collapse cohort-id-` +
            cohortId +
            ` source-id-` +
            sourceId +
            `"><div data-device-id="` +
            deviceId +
            `"  class="deviceStyle d-flex align-self-end col-lg-3 text-center align-middle"><span class="flex-even"></span><span class="flex-even"></span><span class="flex-even">` +
            data[z].device +
            `</span></div>`;
          allInfo(z, "divDevice");
          trHTML += `</div>`;
        }
        // --------DEVICE ENDS---------------------
        //   ====================================
        trHTML += `</div>`;
      }
      trHTML += `</div>`;
    }

    total += `<div class=" sourceStyle row"><div class="col-lg-3 source d-sm-flex align-self-start justify-content-start" ><span class=" ">Total
      </span><span class=""></span><span class=""></span></div>`;

    allTotal(
      totalUsers,
      totalOrders,
      totalConvRate,
      totalRevenue,
      totalAvgOrdValue,
      totalCost,
      totalCostPerUser,
      totalCustAcqCost,
      totalROAS,
      count
    );
    $("#divIncidents").append(total);

    $("#divIncidents").append(trHTML);

    function allInfo(index, divClass) {
      trHTML +=
        `<div class=" ` +
        divClass +
        ` col-lg-1">` +
        data[index].Users.replace(",", " ") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">` +
        data[index].Orders.replace(",", " ") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">` +
        data[index]["Conversion Rate"].replace(".", ",") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">$` +
        data[index].Revenue.replace(",", " ") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">$` +
        data[index]["Avg. Order Value"].replace(",", " ") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">$` +
        data[index].Cost.replace(",", " ") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">$` +
        data[index]["Cost per User"].replace(".", ",") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">$` +
        data[index]["Customer Acquisition Cost"]
          .replace(",", " ")
          .replace(".", ",") +
        `</div><div class=" ` +
        divClass +
        ` col-lg-1">` +
        data[index].ROAS.replace(",", " ") +
        `</div>`;
    }
    function allTotal(
      totalUsers,
      totalOrders,
      totalConvRate,
      totalRevenue,
      totalAvgOrdValue,
      totalCost,
      totalCostPerUser,
      totalCustAcqCost,
      totalROAS,
      count
    ) {
      let totalUsersLet = totalUsers.toLocaleString().replace(",", " ");
      let totalConvRateLet = (
        Math.round((totalConvRate / count + Number.EPSILON) * 100) / 100
      )
        .toLocaleString()
        .replace(".", ",");
      let totalRevenueLet = totalRevenue.toLocaleString().replace(",", " ");
      let totalCostLet = totalCost.toLocaleString().replace(",", " ");
      let totalAvgOrdValueLet = totalAvgOrdValue / count;
      let totalCostPerUserLet =
        Math.round((totalCostPerUser / count + Number.EPSILON) * 100) / 100;
      let totalCostAcqCostLet =
        Math.round((totalCustAcqCost / count + Number.EPSILON) * 100) / 100;
      let totalROASLet = (totalROAS / count).toLocaleString().replace(".", ",");

      return (total +=
        `<div class="col-lg-1">` +
        totalUsersLet +
        `</div><div class="col-lg-1">` +
        totalOrders +
        `</div><div class="col-lg-1">` +
        totalConvRateLet +
        `%</div><div class="col-lg-1">$` +
        totalRevenueLet +
        `</div><div class="col-lg-1">$` +
        totalAvgOrdValueLet +
        `</div><div class="col-lg-1">$` +
        totalCostLet +
        `</div><div class="col-lg-1">$` +
        String(totalCostPerUserLet).replace(".", ",") +
        `</div><div class="col-lg-1">$` +
        String(totalCostAcqCostLet).replace(".", ",") +
        `</div><div class="col-lg-1">` +
        totalROASLet +
        `%</div></div>`);
    }
    function countNoNull(intConvRate, intCostPerUser, intCustAcqCost) {
      if (intConvRate != 0) {
        countConvRate++;
      }
      if (intCostPerUser != 0) {
        countCostPerUser++;
      }
      if (intCustAcqCost != 0) {
        countCustAcqCost++;
      }
    }

    $(document).on(
      {
        mouseenter: function () {
          let count = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty("Source")) {
              count++;
              convRateColor(i, count, "add");
              costPerUserColor(i, count, "add");
              custAcqCostColor(i, count, "add");
              roasColor(i, count, "add");
            }
          }
        },
        mouseleave: function () {
          let count = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty("Source")) {
              count++;
              convRateColor(i, count, "remove");
              costPerUserColor(i, count, "remove");
              custAcqCostColor(i, count, "remove");
              roasColor(i, count, "remove");
            }
          }
        },
      },
      ".source, .divSource"
    );
    // =============cohort==================
    $(document).on(
      {
        mouseenter: function () {
          var id = 0;
          var intConvRateCohort = 0;
          var intCostPerUserCohort = 0;
          var intCustAcqCostCohort = 0;

          var countConvRateCohort = 0;
          var countCostPerUserCohort = 0;
          var countCustAcqCostCohort = 0;
          var totalConvRateCohort = 0;
          var totalCostPerUserCohort = 0;
          var totalCustAcqCostCohort = 0;

          var arrEq = [];
          var arrId = [];
          for (var i = 0; i < 12; i++) {
            if ($(".cohort").eq(i).hasClass("show")) {
              id = parseFloat($(".cohortStyle").eq(i).attr("data-cohort-id"));
              intConvRateCohort = parseFloat(
                data[id]["Conversion Rate"].replace("%", "")
              );
              intCostPerUserCohort = parseFloat(data[id]["Cost per User"]);
              intCustAcqCostCohort = parseFloat(
                data[id]["Customer Acquisition Cost"]
              );
              if (intConvRateCohort != 0) {
                countConvRateCohort++;
              }
              if (intCostPerUserCohort != 0) {
                countCostPerUserCohort++;
              }
              if (intCustAcqCostCohort != 0) {
                countCustAcqCostCohort++;
              }
              totalConvRateCohort += intConvRateCohort;
              totalCostPerUserCohort += intCostPerUserCohort;
              totalCustAcqCostCohort += intCustAcqCostCohort;
              arrEq.push(i);
              arrId.push(id);
            }
          }
          convRateColorCohort(
            "add",
            totalConvRateCohort,
            countConvRateCohort,
            arrEq,
            arrId,
            "remove"
          );
          costPerUserColorCohort(
            "add",
            totalCostPerUserCohort,
            countCostPerUserCohort,
            arrEq,
            arrId,
            "remove"
          );
          custAcqCostColorCohort(
            "add",
            totalCustAcqCostCohort,
            countCustAcqCostCohort,
            arrEq,
            arrId,
            "remove"
          );
          roasColorCohort("add", arrEq, arrId);
        },
        mouseleave: function () {
          var id = 0;
          var intConvRateCohort = 0;
          var intCostPerUserCohort = 0;
          var intCustAcqCostCohort = 0;

          var countConvRateCohort = 0;
          var countCostPerUserCohort = 0;
          var countCustAcqCostCohort = 0;
          var totalConvRateCohort = 0;
          var totalCostPerUserCohort = 0;
          var totalCustAcqCostCohort = 0;
          var arrEq = [];
          var arrId = [];
          for (var i = 0; i < 12; i++) {
            if ($(".cohort").eq(i).hasClass("show")) {
              id = parseFloat($(".cohortStyle").eq(i).attr("data-cohort-id"));
              intConvRateCohort = parseFloat(
                data[id]["Conversion Rate"].replace("%", "")
              );
              intCostPerUserCohort = parseFloat(data[id]["Cost per User"]);
              intCustAcqCostCohort = parseFloat(
                data[id]["Customer Acquisition Cost"]
              );
              if (intConvRateCohort != 0) {
                countConvRateCohort++;
              }
              if (intCostPerUserCohort != 0) {
                countCostPerUserCohort++;
              }
              if (intCustAcqCostCohort != 0) {
                countCustAcqCostCohort++;
              }
              totalConvRateCohort += intConvRateCohort;
              totalCostPerUserCohort += intCostPerUserCohort;
              totalCustAcqCostCohort += intCustAcqCostCohort;
              arrEq.push(i);
              arrId.push(id);
            }
          }
          convRateColorCohort(
            "remove",
            totalConvRateCohort,
            countConvRateCohort,
            arrEq,
            arrId,
            "remove"
          );
          costPerUserColorCohort(
            "remove",
            totalCostPerUserCohort,
            countCostPerUserCohort,
            arrEq,
            arrId,
            "remove"
          );
          custAcqCostColorCohort(
            "remove",
            totalCustAcqCostCohort,
            countCustAcqCostCohort,
            arrEq,
            arrId,
            "remove"
          );
          roasColorCohort("remove", arrEq, arrId);
        },
      },
      ".cohortStyle, .divCohort"
    );

    // =====================cohort end==========================
    // ===================================================
    // =====================device starts======================
    $(document).on(
      {
        mouseenter: function () {
          var id = 0;
          var intConvRateDevice = 0;
          var intCostPerUserDevice = 0;
          var intCustAcqCostDevice = 0;

          var countConvRateDevice = 0;
          var countCostPerUserDevice = 0;
          var countCustAcqCostDevice = 0;
          var totalConvRateDevice = 0;
          var totalCostPerUserDevice = 0;
          var totalCustAcqCostDevice = 0;

          var arrEq = [];
          var arrId = [];
          for (var i = 0; i < 36; i++) {
            if ($(".device").eq(i).hasClass("show")) {
              id = parseFloat($(".deviceStyle").eq(i).attr("data-device-id"));
              intConvRateDevice = parseFloat(
                data[id]["Conversion Rate"].replace("%", "")
              );
              intCostPerUserDevice = parseFloat(data[id]["Cost per User"]);
              intCustAcqCostDevice = parseFloat(
                data[id]["Customer Acquisition Cost"]
              );
              if (intConvRateDevice != 0) {
                countConvRateDevice++;
              }
              if (intCostPerUserDevice != 0) {
                countCostPerUserDevice++;
              }
              if (intCustAcqCostDevice != 0) {
                countCustAcqCostDevice++;
              }
              totalConvRateDevice += intConvRateDevice;
              totalCostPerUserDevice += intCostPerUserDevice;
              totalCustAcqCostDevice += intCustAcqCostDevice;
              arrEq.push(i);
              arrId.push(id);
            }
          }
          convRateColorDevice(
            "add",
            totalConvRateDevice,
            countConvRateDevice,
            arrEq,
            arrId,
            "remove"
          );
          costPerUserColorDevice(
            "add",
            totalCostPerUserDevice,
            countCostPerUserDevice,
            arrEq,
            arrId,
            "remove"
          );
          custAcqCostColorDevice(
            "add",
            totalCustAcqCostDevice,
            countCustAcqCostDevice,
            arrEq,
            arrId,
            "remove"
          );
          roasColorDevice("add", arrEq, arrId);
        },
        mouseleave: function () {
          var id = 0;
          var intConvRateDevice = 0;
          var intCostPerUserDevice = 0;
          var intCustAcqCostDevice = 0;

          var countConvRateDevice = 0;
          var countCostPerUserDevice = 0;
          var countCustAcqCostDevice = 0;
          var totalConvRateDevice = 0;
          var totalCostPerUserDevice = 0;
          var totalCustAcqCostDevice = 0;
          var arrEq = [];
          var arrId = [];
          for (var i = 0; i < 36; i++) {
            if ($(".device").eq(i).hasClass("show")) {
              id = parseFloat($(".deviceStyle").eq(i).attr("data-device-id"));
              intConvRateDevice = parseFloat(
                data[id]["Conversion Rate"].replace("%", "")
              );
              intCostPerUserDevice = parseFloat(data[id]["Cost per User"]);
              intCustAcqCostDevice = parseFloat(
                data[id]["Customer Acquisition Cost"]
              );
              if (intConvRateDevice != 0) {
                countConvRateDevice++;
              }
              if (intCostPerUserDevice != 0) {
                countCostPerUserDevice++;
              }
              if (intCustAcqCostDevice != 0) {
                countCustAcqCostDevice++;
              }
              totalConvRateDevice += intConvRateDevice;
              totalCostPerUserDevice += intCostPerUserDevice;
              totalCustAcqCostDevice += intCustAcqCostDevice;
              arrEq.push(i);
              arrId.push(id);
            }
          }
          convRateColorDevice(
            "remove",
            totalConvRateDevice,
            countConvRateDevice,
            arrEq,
            arrId,
            "remove"
          );
          costPerUserColorDevice(
            "remove",
            totalCostPerUserDevice,
            countCostPerUserDevice,
            arrEq,
            arrId,
            "remove"
          );
          custAcqCostColorDevice(
            "remove",
            totalCustAcqCostDevice,
            countCustAcqCostDevice,
            arrEq,
            arrId,
            "remove"
          );
          roasColorDevice("remove", arrEq, arrId);
        },
      },
      ".deviceStyle, .divDevice"
    );
    // ======================device ends=======================
    // ============================================================
    // ======================Source functions starts=================
    function convRateColor(i, count, sign) {
      if (
        parseFloat(data[i]["Conversion Rate"].replace("%", "")) >
        (Math.round((totalConvRate / countConvRate + Number.EPSILON) * 100) /
          100) *
          1.25
      ) {
        $(".source").eq(count).siblings()[2].classList[sign]("green");
      } else if (
        parseFloat(data[i]["Conversion Rate"].replace("%", "")) <
          (Math.round((totalConvRate / countConvRate + Number.EPSILON) * 100) /
            100) *
            0.75 &&
        parseFloat(data[i]["Conversion Rate"].replace("%", "")) !== 0
      ) {
        $(".source").eq(count).siblings(".divSource")[2].classList[sign]("red");
      }
    }

    function costPerUserColor(i, count, sign) {
      if (
        parseFloat(data[i]["Cost per User"]) <
          (Math.round(
            (totalCostPerUser / countCostPerUser + Number.EPSILON) * 100
          ) /
            100) *
            0.75 &&
        parseFloat(data[i]["Cost per User"]) !== 0
      ) {
        $(".source").eq(count).siblings()[6].classList[sign]("green");
      } else if (
        parseFloat(data[i]["Cost per User"]) >
        (Math.round(
          (totalCostPerUser / countCostPerUser + Number.EPSILON) * 100
        ) /
          100) *
          1.25
      ) {
        $(".source").eq(count).siblings()[6].classList[sign]("red");
      }
    }
    function custAcqCostColor(i, count, sign) {
      if (
        parseFloat(data[i]["Customer Acquisition Cost"]) <
          (Math.round(
            (totalCustAcqCost / countCustAcqCost + Number.EPSILON) * 100
          ) /
            100) *
            0.75 &&
        parseFloat(data[i]["Customer Acquisition Cost"]) !== 0
      ) {
        $(".source").eq(count).siblings()[7].classList[sign]("green");
      } else if (
        parseFloat(data[i]["Customer Acquisition Cost"]) >
        (Math.round(
          (totalCustAcqCost / countCustAcqCost + Number.EPSILON) * 100
        ) /
          100) *
          1.25
      ) {
        $(".source").eq(count).siblings()[7].classList[sign]("red");
      }
    }

    function roasColor(i, count, sign) {
      if (parseFloat(data[i].ROAS.replace("%", "")) >= 150) {
        $(".source").eq(count).siblings()[8].classList[sign]("green");
      } else if (
        parseFloat(data[i].ROAS.replace("%", "")) <= 99 &&
        parseFloat(data[i].ROAS.replace("%", "")) !== 0
      ) {
        $(".source").eq(count).siblings()[8].classList[sign]("red");
      } else {
        $(".source").eq(count).siblings()[8].classList.remove("red");
        $(".source").eq(count).siblings()[8].classList.remove("green");
      }
    }
    // =============================Source function ends==================
    // =========================cohort function starts=========================

    function convRateColorCohort(
      sign,
      totalConvRateCohort,
      countConvRateCohort,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) >
            (Math.round(
              (totalConvRateCohort / countConvRateCohort + Number.EPSILON) * 100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) <
            (Math.round(
              (totalConvRateCohort / countConvRateCohort + Number.EPSILON) * 100
            ) /
              100) *
              1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[2].classList[remove]("red");
          $(".cohortStyle")
            .eq(arrEq[z])
            .siblings()[2]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) >
          (Math.round(
            (totalConvRateCohort / countConvRateCohort + Number.EPSILON) * 100
          ) /
            100) *
            1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[2].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) <
            (Math.round(
              (totalConvRateCohort / countConvRateCohort + Number.EPSILON) * 100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) !== 0
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[2].classList[sign]("red");
        }
      }
    }

    function costPerUserColorCohort(
      sign,
      totalCostPerUserCohort,
      countCostPerUserCohort,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Cost per User"]) >
            (Math.round(
              (totalCostPerUserCohort / countCostPerUserCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Cost per User"]) <
            (Math.round(
              (totalCostPerUserCohort / countCostPerUserCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[6].classList[remove]("red");
          $(".cohortStyle")
            .eq(arrEq[z])
            .siblings()[6]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Cost per User"]) <
            (Math.round(
              (totalCostPerUserCohort / countCostPerUserCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Cost per User"]) !== 0
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[6].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Cost per User"]) >
          (Math.round(
            (totalCostPerUserCohort / countCostPerUserCohort + Number.EPSILON) *
              100
          ) /
            100) *
            1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[6].classList[sign]("red");
        }
      }
    }
    function custAcqCostColorCohort(
      sign,
      totalCustAcqCostCohort,
      countCustAcqCostCohort,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) >
            (Math.round(
              (totalCustAcqCostCohort / countCustAcqCostCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) <
            (Math.round(
              (totalCustAcqCostCohort / countCustAcqCostCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[7].classList[remove]("red");
          $(".cohortStyle")
            .eq(arrEq[z])
            .siblings()[7]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) <
            (Math.round(
              (totalCustAcqCostCohort / countCustAcqCostCohort +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) !== 0
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[7].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) >
          (Math.round(
            (totalCustAcqCostCohort / countCustAcqCostCohort + Number.EPSILON) *
              100
          ) /
            100) *
            1.25
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[7].classList[sign]("red");
        }
      }
    }

    function roasColorCohort(sign, arrEq, arrId) {
      for (var z = 0; z < arrEq.length; z++) {
        if (parseFloat(data[arrId[z]].ROAS.replace("%", "")) >= 150) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[8].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]].ROAS.replace("%", "")) <= 99 &&
          parseFloat(data[arrId[z]].ROAS.replace("%", "")) !== 0
        ) {
          $(".cohortStyle").eq(arrEq[z]).siblings()[8].classList[sign]("red");
        } else {
          $(".cohortStyle").eq(arrEq[z]).siblings()[8].classList.remove("red");
          $(".cohortStyle")
            .eq(arrEq[z])
            .siblings()[8]
            .classList.remove("green");
        }
      }
    }

    // =============================cohort functions ends====================
    // =========================device function starts=================
    function convRateColorDevice(
      sign,
      totalConvRateDevice,
      countConvRateDevice,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) >
            (Math.round(
              (totalConvRateDevice / countConvRateDevice + Number.EPSILON) * 100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) <
            (Math.round(
              (totalConvRateDevice / countConvRateDevice + Number.EPSILON) * 100
            ) /
              100) *
              1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[2].classList[remove]("red");
          $(".deviceStyle")
            .eq(arrEq[z])
            .siblings()[2]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) >
          (Math.round(
            (totalConvRateDevice / countConvRateDevice + Number.EPSILON) * 100
          ) /
            100) *
            1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[2].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) <
            (Math.round(
              (totalConvRateDevice / countConvRateDevice + Number.EPSILON) * 100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Conversion Rate"].replace("%", "")) !== 0
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[2].classList[sign]("red");
        }
      }
    }
    function costPerUserColorDevice(
      sign,
      totalCostPerUserDevice,
      countCostPerUserDevice,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Cost per User"]) >
            (Math.round(
              (totalCostPerUserDevice / countCostPerUserDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Cost per User"]) <
            (Math.round(
              (totalCostPerUserDevice / countCostPerUserDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[6].classList[remove]("red");
          $(".deviceStyle")
            .eq(arrEq[z])
            .siblings()[6]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Cost per User"]) <
            (Math.round(
              (totalCostPerUserDevice / countCostPerUserDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Cost per User"]) !== 0
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[6].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Cost per User"]) >
          (Math.round(
            (totalCostPerUserDevice / countCostPerUserDevice + Number.EPSILON) *
              100
          ) /
            100) *
            1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[6].classList[sign]("red");
        }
      }
    }
    function custAcqCostColorDevice(
      sign,
      totalCustAcqCostDevice,
      countCustAcqCostDevice,
      arrEq,
      arrId,
      remove
    ) {
      for (var z = 0; z < arrEq.length; z++) {
        if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) >
            (Math.round(
              (totalCustAcqCostDevice / countCustAcqCostDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) <
            (Math.round(
              (totalCustAcqCostDevice / countCustAcqCostDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[7].classList[remove]("red");
          $(".deviceStyle")
            .eq(arrEq[z])
            .siblings()[7]
            .classList[remove]("green");
        } else if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) <
            (Math.round(
              (totalCustAcqCostDevice / countCustAcqCostDevice +
                Number.EPSILON) *
                100
            ) /
              100) *
              0.75 &&
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) !== 0
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[7].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]]["Customer Acquisition Cost"]) >
          (Math.round(
            (totalCustAcqCostDevice / countCustAcqCostDevice + Number.EPSILON) *
              100
          ) /
            100) *
            1.25
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[7].classList[sign]("red");
        }
      }
    }
    function roasColorDevice(sign, arrEq, arrId) {
      for (var z = 0; z < arrEq.length; z++) {
        if (parseFloat(data[arrId[z]].ROAS.replace("%", "")) >= 150) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[8].classList[sign]("green");
        } else if (
          parseFloat(data[arrId[z]].ROAS.replace("%", "")) <= 99 &&
          parseFloat(data[arrId[z]].ROAS.replace("%", "")) !== 0
        ) {
          $(".deviceStyle").eq(arrEq[z]).siblings()[8].classList[sign]("red");
        } else {
          $(".deviceStyle").eq(arrEq[z]).siblings()[8].classList.remove("red");
          $(".deviceStyle")
            .eq(arrEq[z])
            .siblings()[8]
            .classList.remove("green");
        }
      }
    }
    // =========================device function ends========================
  });

  $(document).on("click", ".sourceBtn", function () {
    let x = $(this).parent().parent().parent().find(".device");
    if (x.hasClass("show")) {
      $(x).removeClass("show");
    }
  });
});
