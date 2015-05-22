/**
 * JSON Tree
 * =========
 * 
 * Author : Devendra Nationalwala
 * 
 */

var $sourceControl = [];
$.fn.createTree = function(options) {
    $sourceControl = this;
    var settings = $.extend({
        jsonTreeObj: [],
        isDraggable: true
    }, options);

    var tmpObj;
    for (var i = 0; i < settings.jsonTreeObj.length - 1; i++) {
        for (var j = i + 1; j < settings.jsonTreeObj.length; j++) {
            if (settings.jsonTreeObj[i].parent > settings.jsonTreeObj[j].parent) {
                tmpObj = settings.jsonTreeObj[j];
                settings.jsonTreeObj[j] = settings.jsonTreeObj[i];
                settings.jsonTreeObj[i] = tmpObj;
            }
        }
    }
    var hJson = [];
    for (var i = 0; i < settings.jsonTreeObj.length; i++) {
        hJson.push(settings.jsonTreeObj[i]);
        if (settings.jsonTreeObj[i].children === undefined) {
            settings.jsonTreeObj[i].children = [];
        }
        for (var j = 0; j < settings.jsonTreeObj.length; j++) {
            if (settings.jsonTreeObj[i].id === settings.jsonTreeObj[j].parent) {
                settings.jsonTreeObj[i].children.push(settings.jsonTreeObj[j]);
            }
        }
    }
    $sourceControl.html("");
    resultHtml = "<div class=treeContainer>";
    var parentList = [];
    for (var i = 0; i < settings.jsonTreeObj.length; i++) {
        if (settings.jsonTreeObj[i].children.length > 0 && parentList.indexOf(settings.jsonTreeObj[i].id) === -1) {
            resultHtml += '<br/><i class="glyphicon glyphicon-chevron-down toggleArrow"></i><div class="ripplelink parentNode droppableTreeNode ' + settings.jsonTreeObj[i].class + '"><b>' + settings.jsonTreeObj[i].label + '</b><p style="display:none">' + settings.jsonTreeObj[i].id + '</p></div>';
            parentList.push(settings.jsonTreeObj[i].id);
            function printChildren(parentObject) {
                if (parentObject.children !== undefined) {
                    resultHtml += '<div class="childContainer">';
                    for (var j = 0; j < parentObject.children.length; j++) {
                        if (parentObject.children[j].children === undefined || parentObject.children[j].children.length === 0) {
                            resultHtml += '<i class="glyphicon glyphicon-chevron-down whiteIco"></i><div class="childNode draggableTreeNode droppableTreeNode ' + parentObject.children[j].class + '">' + parentObject.children[j].label + '<p style="display:none">' + parentObject.children[j].id + '</p></div>';
                        } else {
                            parentList.push(parentObject.children[j].id);
                            resultHtml += '<i class="glyphicon glyphicon-chevron-down toggleArrow"></i><div class="parentNode droppableTreeNode draggableTreeNode ' + parentObject.children[j].class + '"><b>' + parentObject.children[j].label + '</b><p style="display:none">' + parentObject.children[j].id + '</p></div>';
                        }
                        printChildren(parentObject.children[j]);
                    }
                    resultHtml += '</div>';
                }
                return true;
            }
            var parentObject = settings.jsonTreeObj[i];
            printChildren(parentObject);
        }

    }
    resultHtml += "</div>";
    $sourceControl.html(resultHtml);
    setTimeout(function() {
        if (settings.isDraggable) {
            $(".draggableTreeNode").addClass("showDraggable");
            $(".draggableTreeNode").draggable({revert: true, helper: "clone"});
            $(".droppableTreeNode").droppable({
                hoverClass: "treeNodeHover",
                drop: function(event, ui) {
                    updateTree($(this).find('p').html(), ui.draggable.find('p').html());
                }
            });
        } else {
            $(".draggableTreeNode").removeClass("showDraggable");
        }
        $(".toggleArrow").click(function() {
            if ($(this).hasClass("closed")) {
                $(this).removeClass("glyphicon-play");
                $(this).addClass("glyphicon-chevron-down");
                $(this).removeClass("closed");
                $(this).next().next().show();

            } else {
                $(this).addClass("closed");
                $(this).addClass("glyphicon-play");
                $(this).removeClass("glyphicon-chevron-down");
                $(this).next().next().hide();
            }
        });
    }, 500);
    function updateTree(parentId, childId) {
        for (var i = 0; i < settings.jsonTreeObj.length; i++) {
            if (settings.jsonTreeObj[i].id === childId) {
                settings.jsonTreeObj[i].parent = parentId;
            }
        }
        for (var i = 0; i < settings.jsonTreeObj.length; i++) {
            settings.jsonTreeObj[i].children = undefined;
        }
        $sourceControl.createTree({
            "jsonTreeObj": settings.jsonTreeObj
        });
    }
};


