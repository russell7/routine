// ==UserScript==
// @name       fill ims workflow
// @namespace  org.holer.misc.ims.workflow
// @version    0.2
// @description  auto fill form for workflow in ims
// @match      http://172.168.6.157:8082/vworkflow/workflow/workflow.jsp?workflowid=*
// @match      http://183.238.7.26:8082/vworkflow/workflow/workflow.jsp?workflowid=*
// @copyright  2013+, Russell
// ==/UserScript==

var i = 0;
// inject ui
// input for percent
$("input.InputStyle2[style='height: 18px; width: 79px']").each(function () {
	$(this).after("<input type='button' onclick='fillRow(this," + i++ + ")' value='auto fill'/>");
});

$("input.InputStyle2[style='width: 79px; height: 18px']").each(function () {
	$(this).after("<input type='button' onclick='fillRow(this," + i++ + ")' value='auto fill'/>");
});

function fillRow (i,offset) {
	var thisRow = $(i).closest("table").closest("tr");
	var workRequest = thisRow.children("td:eq(7)").find("tr:eq(" + offset +") textarea").html();
	thisRow.children("td:eq(9)").find("tr:eq(" + offset +") textarea").val(workRequest);
	thisRow.children("td:eq(11)").find("tr:eq(" + offset +") input").val("100");
	var workDuration = thisRow.children("td:eq(8)").find("tr:eq(" + offset +") input").val();
    console.log(workDuration);
	thisRow.children("td:eq(13)").find("tr:eq(" + offset +") input").val(workDuration);
	//thisRow.children("td:eq(14)").find("tr:eq(" + offset +") input").val("");
    $("button.btn:first").focus();
}

function onSubmitPlus(issave){
	return true;
}

var scriptNode = document.createElement('script'),
text = [];
//text.push('(function () {');
text.push(fillRow.toString());
text.push(onSubmitPlus.toString());
//text.push('})();');
scriptNode.textContent = text.join('\n');
document.head.appendChild(scriptNode);

document.getElementsByTagName("script")[23].remove();

