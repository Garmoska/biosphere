(function (commonscripts, $) {
    const ErrorFormMessageSelector = "#errorForm_Message";
    const ErrorFormWndSelector = "#errorForm_Window";

    window.commonscripts = commonscripts;

    function getErrMsgWnd() {
        return $(ErrorFormWndSelector).data("kendoWindow");
    }

    $.extend(window.commonscripts, {
        doNothing: function () {},

        redirectTo: function (url, newtab) {
            if (url === "") return;
            if ((newtab == null) || (newtab === 0)) {
                window.location.href = url;
            } else {
                window.open(url, "_blank");
            }
        },

        hideDiv: function (divname) {
            $(divname).removeClass("divshow").removeClass("divshowblock").addClass("divhide");
        },

        showDiv: function (divname) {
            $(divname).removeClass("divhide").addClass("divshow");
        },

        showDivBlock: function (divname) {
            $(divname).removeClass("divhide").addClass("divshowblock");
        },

        setVisible: function (divname, visible) {
            if (visible === true)
                $(divname).removeClass("invisible").addClass("visible");
            else
                $(divname).removeClass("visible").addClass("invisible");
        },

        reloadControl: function (url, divname, formname, afterSuccessFunction, parametersList, isAppend, onErrHandler) {
            "use strict";

            onErrHandler = onErrHandler || function () { };

            var model =
                parametersList != null
                    ? parametersList
                    : (formname != null ? $(formname).formSerialize() : $("form").formSerialize());
            $.ajax({
                url: url,
                cache: false,
                dataType: "json",
                type: "POST",
                async: true,
                data: model,
                success: function (data) {
                    var succ = $("#SaveState");
                    if (data.result === "OK") {
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "block";
                            setTimeout(function () {
                                succ[0].style.display = "none";
                            },
                                2000);
                        }
                        if (data.html != null && data.html.length > 0) {
                            if (isAppend != null) {
                                $(divname).append(data.html);
                            } else {
                                $(divname).html(data.html);
                            }
                        }
                        if (afterSuccessFunction != null) afterSuccessFunction(data);

                    } else {
                        onErrHandler();
                        commonscripts.showErrorForm(data.error);
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "none";
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    onErrHandler();
                    commonscripts.showErrorForm(errorThrown);
                }
            });
        },

        //opt -- optional parameter for any purpose
        performAction: function (url, parametersList, afterSuccessFunction, oErrHandler, opt) {
            var onErrHandler = oErrHandler || function () { };
            $.ajax({
                url: url,
                cache: false,
                dataType: "json", //TODO change to the proper data type (form data?)
                type: "POST",
                data: parametersList,
                async: true,
                success: function (data) {
                    var succ = $("#SaveState");
                    if (data.result === "OK") {
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "block";
                            setTimeout(function () {
                                succ[0].style.display = "none";
                            }, 2000);
                        }
                        if (afterSuccessFunction != null) afterSuccessFunction(data, opt);
                    } else {
                        onErrHandler();
                        commonscripts.showErrorForm(data.error);
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "none";
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    onErrHandler();
                    commonscripts.showErrorForm(errorThrown);
                }
            });
        },

        showErrorForm: function (message) {
            $(ErrorFormMessageSelector).html(message);
            getErrMsgWnd().center().open();
        },

        closeErrorForm: function () {
            getErrMsgWnd().close();
        },

        showMessageBox: function (message, title) {
            let wnd = getErrMsgWnd();
            if (wnd) {
                let oldTitle = wnd.title();
                let onCloseWnd = function () {
                    wnd.unbind("close", onCloseWnd);
                    wnd.title(oldTitle);
                }
                if (title) {
                    wnd.title(title);
                }
                wnd.bind("close", onCloseWnd);
                this.showErrorForm(message);
            }
        },

        sendForm: function (url, formname, afterSuccessFunction, onErrHandler) {
            onErrHandler = onErrHandler || function () { };
            var model = formname != null
                ? $(formname).formSerialize()
                : $("form").formSerialize();
            $.ajax({
                url: url,
                cache: false,
                dataType: "json",
                type: "POST",
                async: true,
                data: model,
                success: function (data) {
                    var succ = $("#SaveState");
                    if (data.result === "OK") {
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "block";
                            setTimeout(function () {
                                succ[0].style.display = "none";
                            },
                                2000);
                        }
                        if (data.url != null) commonscripts.redirectTo(data.url);
                        if (afterSuccessFunction != null) afterSuccessFunction(data);
                    } else {
                        onErrHandler();
                        commonscripts.showErrorForm(data.error);
                        if (succ != null && succ.length > 0) {
                            succ[0].style.display = "none";
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    onErrHandler();
                    commonscripts.showErrorForm(errorThrown);
                }
            });
        },

        KeydownNumeric: function (e, keys, separatorCode, separator) {
            if (e.key === separator) {
                return;
            }
            if (e.key == undefined && e.keyCode === separatorCode) {
                return;
            }
            // Allow: keys
            if ($.inArray(e.keyCode, keys) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        },

        getCharCode: function(evt) {
            evt = (evt) ? evt : window.event;
            return (evt.which) ? evt.which : evt.keyCode;
        },

        isNumber: function (evt) {
            let charCode = commonscripts.getCharCode(evt);
            //45 = "minus", 46 = "dot"
            return ((charCode >= 48 && charCode <= 57) || charCode === 45 || charCode === 46 || charCode === 8);
        },

        numericFieldChanged: function (evt) {
            if (!commonscripts.isNumber(evt)) return false;
            let fld = $("#" + evt.currentTarget.id);
            let basel = parseInt(fld.attr("basemaxlength"));
            let val = fld.val();
            //"minus" or "dot"
            let addSymbols = 0;
            if (val.indexOf("-") > -1) addSymbols++;
            let indexDot = val.indexOf(".");
            if (indexDot > -1) addSymbols++;
            fld.attr("maxlength", basel + addSymbols);
            //number of digits must be not greater than basemaxlength
            let amountOfDigits = commonscripts.getNumberOfDigits(val);
            if (amountOfDigits + 1 > basel) return false;
            let scale = parseInt(fld.attr("scale"));
            if (scale > 0 && indexDot > -1) {
                let amountOfDigitsAfterDot = commonscripts.getNumberOfDigits(val.substring(indexDot));
                if (amountOfDigitsAfterDot + 1 > scale) return false;
            }
            return true;
        },

        getNumberOfDigits: function(value) {
            return value.replace(/[^0-9]/g, "").length;
        },

        isInt: function (value) {
            return !isNaN(value) && !isNaN(parseInt(value));
            //parseInt(Number(value)) === value &&
            //!isNaN(parseInt(value, 10));
        },

        setControlValue: function (controlName, value) {
            var c = $(controlName);
            if (c != null) {
                c.val(value);
            }
        },

        setControlHtml: function (controlName, html) {
            var c = $(controlName);
            if (c != null) {
                c.html(html);
            }
        },

        addRowInTable: function (tableId, arrayOfValues) {
            var table = document.getElementById(tableId);
            var row = table.insertRow();
            for (var index = 0; index < arrayOfValues.length; index++) {
                var cell = row.insertCell();
                cell.innerHTML = arrayOfValues[index];
            }
        },

        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },

        getCookie: function (cname) {
            let name = cname + "=";
            let ca = document.cookie.split(";");
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

        asyncImageLoad: function (img) {
            var newimg = new Image();
            newimg.src = img.attr("src-real");
            newimg.setAttribute("class", "image-responsive");
            newimg.onload = function () {
                img.replaceWith(newimg);
            };
        },

        //list -- JSON array of SelectListItem
        kendoDropDownListFillValues: function (ctrlName, list, selectedValue) {
            let ctrl = $("#" + ctrlName).data("kendoDropDownList");
            let optionLabel = ctrl.optionLabel;
            ctrl.dataSource.data(list);
            if (selectedValue != null && selectedValue.length > 0) {
                let delta = optionLabel != null && optionLabel.length > 0 ? 1 : 0;
                ctrl.select(list.indexOf(selectedValue) + delta);
            }
        },

        createDropDownFromGrid: function(gridId, idField, textField) {
            let grid = $(gridId).data("kendoGrid");
            let rows = grid.dataSource.transport.data;
            let data = [];
            for (let rowNum = 0; rowNum < rows.length; rowNum++) {
                data.push({ id: rows[rowNum][idField], text: rows[rowNum][textField] });
            }
            return data;
        },

        getAssetsPath: function() {
            return window.location.protocol + "//" + window.location.host + "/assets";
        }
    });
})(window.commonscripts || {}, jQuery);
