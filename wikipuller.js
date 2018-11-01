
var baseURL = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=max";

// weapons table properties
var weaponTable = "Weapons";
var weaponFields = ["Id", "BaseId", "FormId", "WeaponName", "Type", "Rarity", "ElementalType", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "VariationId", "DecBaseId", "DecVariationId", "BulletBaseId", "BulletVariationId", "Skill", "SkillName", "SkillDesc", "IsPlayable", "FlavorText", "SellCoin", "SellDewPoint", "CraftNodeId", "ParentCraftNodeId", "CraftGroupId", "FortCraftLevel", "AssembleCoin", "DisassembleCoin", "DisassembleCost", "MainWeaponId", "MainWeaponQuantity", "CraftMaterialType1", "CraftMaterial1", "CraftMaterialQuantity1", "CraftMaterialType2", "CraftMaterial2", "CraftMaterialQuantity2", "CraftMaterialType3", "CraftMaterial3", "CraftMaterialQuantity3", "CraftMaterialType4", "CraftMaterial4", "CraftMaterialQuantity4", "CraftMaterialType5", "CraftMaterial5", "CraftMaterialQuantity5"];

// wyrmprints table properties
var wyrmprintTable = "Wyrmprints";
var wyrmprintFields = ["BaseId=Id", "Name", "Rarity", "AmuletType", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "VariationId", "Abilities11", "Abilities12", "Abilities21", "Abilities22", "Abilities31", "Abilities32", "ArtistCV", "FlavorText1", "FlavorText2", "FlavorText3", "FlavorText4", "FlavorText5", "IsPlayable", "SellCoin", "SellDewPoint", "ReleaseDate", "FeaturedCharacters"];

// dragon table properties
var dragonTable = "Dragons";
var dragonFields = ["BaseId", "Id", "Name", "NameJP", "Title", "Obtain", "Rarity", "ElementalType", "VariationId", "IsPlayable", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "Skill1", "SkillName", "SkillDescription", "Abilities11", "Abilities12", "Abilities21", "Abilities22", "ProfileText", "FavoriteType", "JapaneseCV", "EnglishCV", "SellCoin", "SellDewPoint", "MoveSpeed", "DashSpeedRatio", "TurnSpeed", "IsTurnToDamageDir", "MoveType", "IsLongRange", "ReleaseDate"];

// parsed JSON data
var weaponData = { value: [] };
var wyrmprintData = { value: [] };
var dragonData = { value: [] };

function constructAPIRequest(table, fields) {
    var resultURL = baseURL + "&tables=" + table;

    resultURL += "&fields=";
    for (var i = 0; i < fields.length; ++i) {
        resultURL += fields[i] + ",+";
    }
    return resultURL;
}

function removeDuplicates(json, key) {

}

function extractDataFromAPIRequest(json) {
    var cargoTable = json.cargoquery;
    var resultArray = [];
    for (var i = 0; i < cargoTable.length; ++i) {
        var entry = cargoTable[i].title;
        var isDuplicate = false;
        for (var j = 0; j < resultArray.length; ++j) {
            if (entry.Id === resultArray[j].Id) {
                isDuplicate = true;
            }
        }
        if (!isDuplicate) {
            resultArray.push(entry);
        }
    }
    return resultArray;
}

function clearDisplay() {
    document.getElementById("displayarea").innerHTML = "";
}

function getWeaponData() {
    getData(weaponTable, weaponFields, weaponData);
}

function getWyrmprintData() {
    getData(wyrmprintTable, wyrmprintFields, wyrmprintData);
}

function getDragonData() {
    getData(dragonTable, dragonFields, dragonData);
}

function getData(tableName, fields, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parsedJSON = JSON.parse(xhttp.responseText);
            data.value = JSON.stringify(extractDataFromAPIRequest(parsedJSON), null, 2);
            document.getElementById("displayarea").innerHTML = data.value;
        }
    }
    xhttp.open("GET", constructAPIRequest(tableName, fields), true);
    xhttp.send();
}

function downloadWeaponData() {
    var fileName = "weaponData.js";
    downloadData(fileName, "var weapons = " + weaponData.value);
}

function downloadWyrmprintData() {
    var fileName = "wyrmprintData.js";
    downloadData(fileName, "var wyrmprints = " + wyrmprintData.value);
}

function downloadDragonData() {
    var fileName = "dragonData.js";
    downloadData(fileName, "var dragons = " + dragonData.value);
}

function downloadData(filename, content) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}