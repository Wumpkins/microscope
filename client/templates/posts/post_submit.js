Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var temp = $(e.target).find('[name=url]').val();

		if(!((temp.substr(0,7)==="http://") || (temp.substr(0,8)==="https://")))
			temp = "http://" + temp;

		var post = {
			title: $(e.target).find('[name=title]').val(),
			url: temp
		};

		Meteor.call('postInsert', post, function(error, result){
			if (error)
				return alert(error.reason);

			if(result.postExists)
				alert('This link has already been posted');

			Router.go('postPage', {_id: result._id});
		});
	}
})