
var github_api_url= "https://api.github.com/search/repositories?q=''";
var itemLimit = 10; //maximum number of items GitHub API allows
var apiKey="df1672120145293d077a0b3b5a61d9950234d9a5"
var page_number=20;
var language_json_url="https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json"	;
var language_list=[]

function SearchRepo(){
	alert('inside search repo form');
	pageNumber = 1 ;
	var url = github_api_url + 'language=' + get_search_content();
	alert(url)

	$.getJSON(url, {'apikey' : apiKey,'content' : get_search_content(),}, function(data){
		var repo_count=RepoCount(data);
		//language_json_data(data);
		show_repo(data);

	
	});
}

// loading json data

function language_json_data(repo_data){
	$.ajax({
    url: language_json_url,
    success: function (data) {
        var obj = JSON.parse(data);
        //alert(typeof obj)
        for(var i in obj){
        	language_list.push(obj[i]);
        }

        alert(typeof language_list);

        if(get_search_content() in language_list){
        	show_repo(repo_data);
        } 
       else{
       		alert('Please enter a language');
        }
        
    }
});
}

// gettting search content
function get_search_content(){
	return $('#input_search').val();
}


//displaying number of repo count

function RepoCount(data){
	// alert(data.total_count);
	return data.total_count
}

// showing repo content

function show_repo(data){
	repo_content= "<h2>Search Results</h2>";
			
	for(i=0;i<page_number;i++){
			var repo_name = data.items[i]['full_name'];

			var language  =  data.items[i]['language'];
			if(language == null)
				language = "";
			else
				language = "<br>Written in " + language;
					
			var description = data.items[i]['description']

			repo_content+= "<div class='content'><h2><a href='" + 
				data.items[i]["html_url"]+"'>"+ repo_name +
				"</a></h2><p>" + description + language +
				"</p></div>";
	

			// $('#results').html("<div><h2 style='color:green;'>" 
			// 				+ data.items[i]['full_name'] + "</h2><p>Language: " 
			// 				+ data.items[i]['language'] + "</p>Description : <span>" 
			// 				+ data.items[i]['description'] + "</span></div>");
		}

		$('#repo_count').html("<div class='well' style='width:700px;'>We have found " 
						+ "<span style='color:orange;'>" + RepoCount(data) + "</span> repository results in " + get_search_content() + "</div>")
		$('#results').html(repo_content);
		
		
}

