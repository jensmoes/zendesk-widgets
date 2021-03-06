<div id='simpleSearch'>
<div class="select" style>
    <label for="operatorSelect">Status</label>
     <select id="operatorSelect" name="operatorSelect" onchange style="width: auto;">
          <option value=":">Is</option>
          <option value=">">Greater Then</option>
          <option value="<">Less Then</option>
          <option value=">=">Greater Than or Equal to</option>
          <option value="<=">Less Then or Equsl to</option>
     </select>
<div class="select" style>
     <select id="statusSelect" name="statusSelect" onchange style="width: auto;">
          <option value="">-</option>
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="solved">Solved</option>
     </select>

<ol>
    <li>
      <label for="searchDate">Date (Format YYYY-MM-DD)</label>
      <div class="select" style>
           <select id="opDateSelect" name="opDateSelect" onchange style="width: auto;">
                <option value=":">Is</option>
                <option value=">">Greater Then</option>
                <option value="<">Less Then</option>
                <option value=">=">Greater Than or Equal to</option>
                <option value="<=">Less Then or Equsl to</option>
           </select>
       <input type="text" name="searchDate" id="searchDate" style="width: 196px" />
      </li>
      <li>
          <label for="searchOr">Organization</label>
          <div class="select" style>
               <select id="searchOr" name="searchOr" onchange style="width: auto;">
                    <option value="">-</option>
               </select>
          </li>
     <li>
        <label for="keywordSearch">Search Keywords</label>
         <input type="text" name="keywordSearch" id="keywordSearch" style="width: 196px"  />
      </li>
      
</ol>        
     
    <input type='button' value='Search' onclick='GoSearch();'>
    <div style='padding: 4px; font-weight: bold; font-size: 18px;'>
        <div id='createtheticket_status'></div>
        <div id='createtheticket_error'></div>
    </div>
</div>


<script type="javascript">
    
(function () {
    
    var orgPageCount = 1
    GetOrgData = function(){
        $j.getJSON('/organizations.json?page='+ orgPageCount, function(skipgroupobj){
            if ( skipgroupobj.length !== 0) {
                $j.each(skipgroupobj, function(i, item){
                       $j('#searchOr').append('<option value="'+ item.name+'">'+item.name+'</option>');
                    //console.log(item.name)
                }
            );
               orgPageCount = orgPageCount +1;
               GetOrgData();
            } else {
                return;
            }
       }
       );            
     }
    
    GoSearch = function () {
        var search_parameters = '';
        if($j('#statusSelect').val()){
            search_parameters += 'status' + $j('#operatorSelect').val() + $j('#statusSelect').val() + ' ';
        }
        if($j('#searchDate').val()) {
            search_parameters += 'created' + $j('#opDateSelect').val() + $j('#searchDate').val() + ' ';
        }
        if($j('#searchOr').val()) {
            search_parameters += 'organization:"' + $j('#searchOr').val() + '" ';
        }
        if($j('#keywordSearch').val()) {
            search_parameters += $j('#keywordSearch').val();
        }
        
        location.replace('/search?query=' + search_parameters + ' type%3Aticket&commit=Search')
    }

GetOrgData();
}());

</script>