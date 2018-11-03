
var baseURL = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=max";

// adventurers table properties
var adventurerTable = "Adventurers";
var adventurerFields = ["Id", "Name", "NameJP", "Title", "WeaponType", "Rarity", "ElementalType", "CharaType", "VariationId", "MinHp3", "MinHp4", "MinHp5", "MaxHp", "PlusHp0", "PlusHp1", "PlusHp2", "PlusHp3", "PlusHp4", "McFullBonusHp5", "MinAtk3", "MinAtk4", "MinAtk5", "MaxAtk", "PlusAtk0", "PlusAtk1", "PlusAtk2", "PlusAtk3", "PlusAtk4", "McFullBonusAtk5", "MinDef", "DefCoef", "Skill1Name", "Skill2Name", "Abilities11", "Abilities12", "Abilities13", "Abilities14", "Abilities21", "Abilities22", "Abilities23", "Abilities24", "Abilities31", "Abilities32", "Abilities33", "Abilities34", "ExAbilityData1", "ExAbilityData2", "ExAbilityData3", "ExAbilityData4", "ExAbilityData5", "ManaCircleName", "JapaneseCV", "EnglishCV", "Description", "IsPlayable", "MaxFriendshipPoint", "Obtain", "ReleaseDate"];
var adventurerGrouping = ["Id", "VariationId"];

// weapons table properties
var weaponTable = "Weapons";
var weaponFields = ["Id", "BaseId", "FormId", "WeaponName=Name", "Type", "Rarity", "ElementalType", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "VariationId", "DecBaseId", "DecVariationId", "BulletBaseId", "BulletVariationId", "Skill", "SkillName", "SkillDesc", "IsPlayable", "FlavorText", "SellCoin", "SellDewPoint", "CraftNodeId", "ParentCraftNodeId", "CraftGroupId", "FortCraftLevel", "AssembleCoin", "DisassembleCoin", "DisassembleCost", "MainWeaponId", "MainWeaponQuantity", "CraftMaterialType1", "CraftMaterial1", "CraftMaterialQuantity1", "CraftMaterialType2", "CraftMaterial2", "CraftMaterialQuantity2", "CraftMaterialType3", "CraftMaterial3", "CraftMaterialQuantity3", "CraftMaterialType4", "CraftMaterial4", "CraftMaterialQuantity4", "CraftMaterialType5", "CraftMaterial5", "CraftMaterialQuantity5"];
var weaponGrouping = ["Id"];

// wyrmprints table properties
var wyrmprintTable = "Wyrmprints";
var wyrmprintFields = ["BaseId", "Name", "Rarity", "AmuletType", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "VariationId", "Abilities11", "Abilities12", "Abilities21", "Abilities22", "Abilities31", "Abilities32", "ArtistCV", "FlavorText1", "FlavorText2", "FlavorText3", "FlavorText4", "FlavorText5", "IsPlayable", "SellCoin", "SellDewPoint", "ReleaseDate", "FeaturedCharacters"];
var wyrmprintGrouping = ["BaseId"];

// dragon table properties
var dragonTable = "Dragons";
var dragonFields = ["BaseId", "Id", "Name", "NameJP", "Title", "Obtain", "Rarity", "ElementalType", "VariationId", "IsPlayable", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "Skill1", "SkillName", "SkillDescription", "Abilities11", "Abilities12", "Abilities21", "Abilities22", "ProfileText", "FavoriteType", "JapaneseCV", "EnglishCV", "SellCoin", "SellDewPoint", "MoveSpeed", "DashSpeedRatio", "TurnSpeed", "IsTurnToDamageDir", "MoveType", "IsLongRange", "ReleaseDate"];
var dragonGrouping = ["BaseId", "VariationId"];

// abilities table properties
var abilityTable = "Abilities";
var abilityFields = ["Id", "GenericName", "Name", "Details", "AbilityIconName", "AbilityGroup", "PartyPowerWeight"];
var abilityGrouping = ["Id"];


// parsed JSON data
var adventurerData = { value: [] };
var weaponData = { value: [] };
var wyrmprintData = { value: [] };
var dragonData = { value: [] };
var abilityData = { value: [] };

function constructAPIRequest(table, fields, grouping) {
    var resultURL = baseURL + "&tables=" + table;

    resultURL += "&fields=";
    for (var i = 0; i < fields.length; ++i) {
        resultURL += fields[i];
        if (i + 1 < fields.length) {
            resultURL += ",+";
        }
    }

    resultURL += "&group_by=";
    for (var i = 0; i < grouping.length; ++i) {
        resultURL += grouping[i];
        if (i + 1 < grouping.length) {
            resultURL += ",+";
        }
    }

    return resultURL;
}

function extractDataFromAPIRequest(json) {
    var cargoTable = json.cargoquery;
    var resultArray = [];
    for (var i = 0; i < cargoTable.length; ++i) {
        var entry = cargoTable[i].title;
        resultArray.push(entry);
    }
    return resultArray;
}

function clearDisplay() {
    document.getElementById("displayarea").innerHTML = "";
}

function getAdventurerData() {
    getData(adventurerTable, adventurerFields, adventurerGrouping, adventurerData);
}

function getWeaponData() {
    getData(weaponTable, weaponFields, weaponGrouping, weaponData);
}

function getWyrmprintData() {
    getData(wyrmprintTable, wyrmprintFields, wyrmprintGrouping, wyrmprintData);
}

function getDragonData() {
    getData(dragonTable, dragonFields, dragonGrouping, dragonData);
}

function getAbilityData() {
    getData(abilityTable, abilityFields, abilityGrouping, abilityData);
}

function getData(tableName, fields, grouping, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parsedJSON = JSON.parse(xhttp.responseText);
            data.value = JSON.stringify(extractDataFromAPIRequest(parsedJSON), null, 2);
            document.getElementById("displayarea").innerHTML = data.value;
        }
    }
    xhttp.open("GET", constructAPIRequest(tableName, fields, grouping), true);
    xhttp.send();
}

function downloadAdventurerData() {
    var fileName = "adventurerData.js";
    downloadData(fileName, "var adventurers = " + adventurerData.value);
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

function downloadAbilityData() {
    var fileName = "abilityData.js";
    downloadData(fileName, "var abilities = " + abilityData.value);
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