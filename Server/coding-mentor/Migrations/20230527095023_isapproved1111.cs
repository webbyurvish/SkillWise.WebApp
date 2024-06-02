using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace coding_mentor.Migrations
{
    /// <inheritdoc />
    public partial class isapproved1111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            List<string> countryNames = new List<string>
            {
                  "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
            };


            foreach (string countryName in countryNames)
            {
                migrationBuilder.InsertData(
                    table: "Countries",
                    columns: new[] { "Name" },
                    values: new object[] { countryName });
            }
            List<string> languageNames = new List<string>
            {
                  "English",
    "Spanish",
    "Mandarin Chinese",
    "Hindi",
    "Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Japanese",
    "German",
    "French",
    "Italian",
    "Korean",
    "Turkish",
    "Dutch",
    "Polish",
    "Swedish",
    "Indonesian",
    "Greek",
    "Danish",
    "Norwegian",
    "Finnish",
    "Czech",
    "Thai",
    "Hebrew",
    "Romanian",
    "Hungarian",
    "Vietnamese",
    "Malay",
    "Slovak",
    "Bulgarian",
    "Lithuanian",
    "Slovenian",
    "Latvian",
    "Croatian",
    "Estonian",
    "Serbian",
    "Albanian",
    "Macedonian",
    "Ukrainian",
    "Georgian",
    "Armenian",
    "Persian",
    "Swahili",
    "Tagalog",
    "Hausa",
    "Bengali",
    "Gujarati",
    "Punjabi",
    "Telugu",
    "Tamil",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Urdu"
            };


            foreach (string languageName in languageNames)
            {
                migrationBuilder.InsertData(
                    table: "Languages",
                    columns: new[] { "Name" },
                    values: new object[] { languageName });
            }


            List<string> skillNames = new List<string>
            {
                 "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Objective-C",
    "Go",
    "Rust",
    "Dart",

    "React",
    "Angular",
    "Vue.js",
    "Ember.js",
    "Svelte",
    "Bootstrap",
    "Tailwind CSS",
    "Material-UI",

    "Node.js",
    "Express.js",
    "ASP.NET",
    "Ruby on Rails",
    "Django",
    "Flask",
    "Spring Boot",
    "Laravel",
    "Symfony",

    "React Native",
    "Flutter",
    "Xamarin",
    "Ionic",

    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "SQLite",

    "Git",
    "GitHub",
    "Bitbucket",

    "Nginx",
    "Apache",

    "AWS",
    "Azure",
    "Google Cloud",


    "Jest",
    "Mocha",
    "Selenium",
    "Cypress",
    "JUnit",


    "Docker",
    "Kubernetes",
    "Jenkins",
    "Ansible",
    "Terraform",


    "Webpack",
    "Babel",
    "Gulp",
    "Grunt",
    "Visual Studio",
    "IntelliJ IDEA",
    "VS Code"

            };

            foreach (string skillName in skillNames)
            {
                migrationBuilder.InsertData(
                    table: "Skills",
                    columns: new[] { "Name" },
                    values: new object[] { skillName });
            }



        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
          
        }
    }
}
