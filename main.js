document.getElementById('button').addEventListener("click", function() {
	var invalidResume = JSON.parse(document.getElementById('invalid').value);
	var validResume = {};

	validResume.basics = invalidResume.bio;
	validResume.basics.name = invalidResume.bio.firstName + " " + invalidResume.bio.lastName;
	delete validResume.basics.firstName;
	delete validResume.basics.lastName;

	validResume.basics.label = "";
	validResume.basics.picture = "";

	if (invalidResume.bio.email) {
		validEmail = (invalidResume.bio.email.personal || invalidResume.bio.email.work);
		delete validResume.basics.email;
		validResume.basics.email = validEmail;
	}

	if (invalidResume.bio.phone) {
		validPhone = (invalidResume.bio.phone.personal || invalidResume.bio.phone.work);
		delete validResume.basics.phone;
		validResume.basics.phone = validPhone;
	}

	if (invalidResume.bio.websites) {
		for (var prop in invalidResume.bio.websites) {
			validResume.basics.website = invalidResume.bio.websites[prop];
			break;
		}
		delete invalidResume.bio.websites;
	}

	var validSummary = invalidResume.bio.summary;
	delete validResume.basics.summary;
	validResume.basics.summary = validSummary;

	if (invalidResume.bio.location) {
		if (invalidResume.bio.location.state) {
			validResume.basics.location.region = invalidResume.bio.location.state;
			delete invalidResume.bio.location.state;
		}
		validResume.basics.location.address = "";
		validResume.basics.location.postalCode = "";
		var validLocation = validResume.basics.location;
		delete validResume.basics.location;
		validResume.basics.location = validLocation;
	}

	if (invalidResume.bio.profiles) {
		var validProfiles = [];
		for (var prop in invalidResume.bio.profiles) {
			var profileObject = {};
			profileObject['network'] = prop;
			profileObject['username'] = invalidResume.bio.profiles[prop];
			switch (prop.toLowerCase()) {
				case 'twitter':
					profileObject['url'] = 'https://twitter.com/' + invalidResume.bio.profiles[prop];
					break;
				case 'soundcloud':
				case 'sound-cloud':
					profileObject['url'] = 'https://soundcloud.com/' + invalidResume.bio.profiles[prop];
					break;
				case 'youtube':
				case 'you-tube':
					profileObject['url'] = 'https://youtube.com/user/' + invalidResume.bio.profiles[prop];
					break;
				case 'linkedin':
					profileObject['url'] = 'https://www.linkedin.com/in/' + invalidResume.bio.profiles[prop];
					break;
				case 'github':
					profileObject['url'] = 'https://github.com/' + invalidResume.bio.profiles[prop];
					break;
				default:
					profileObject['url'] = '';
			}
			validProfiles.push(profileObject)
		}
		delete invalidResume.bio.profiles;
		validResume.basics.profiles = validProfiles;
	}

	if (invalidResume.work) {
		validResume.work = invalidResume.work;
	}

	validResume.volunteer = [
		{
			organization: "",
			position: "",
			website: "",
			startDate: "",
			endDate: "",
			summary: "",
			highlights: [""]
		}
	];

	if (invalidResume.education) {
		validResume.education = invalidResume.education;
		for (var i = 0; i < validResume.education.length; i++) {
			validResume.education[i].gpa = '';
		}
	}

	if (invalidResume.awards) {
		validResume.awards = invalidResume.awards;
		for (var j = 0; j < validResume.awards.length; j++) {
			validResume.awards[j].summary = '';
		}
	}

	if (invalidResume.publications) {
		validResume.publications = invalidResume.publications;
		for (var k = 0; k < validResume.publications.length; k++) {
			validResume.publications[k].summary = '';
		}
	}

	if (invalidResume.skills) {
		validResume.skills = invalidResume.skills;
	}

	validResume.languages = [
		{
			language: "English",
			fluency: ""
		}
	];
	
	if (invalidResume.references) {
		validResume.references = invalidResume.references;
	}

	document.getElementById('result').value = JSON.stringify(validResume, null, 2);
});