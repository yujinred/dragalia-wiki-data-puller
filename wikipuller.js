
var baseURL = "https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=max";

var weaponTable = "Weapons";
var weaponFields = ["Id", "BaseId", "FormId", "WeaponName", "Type", "Rarity", "ElementalType", "MinHp", "MaxHp", "MinAtk", "MaxAtk", "VariationId", "DecBaseId", "DecVariationId", "BulletBaseId", "BulletVariationId", "Skill", "SkillName", "SkillDesc", "IsPlayable", "FlavorText", "SellCoin", "SellDewPoint", "CraftNodeId", "ParentCraftNodeId", "CraftGroupId", "FortCraftLevel", "AssembleCoin", "DisassembleCoin", "DisassembleCost", "MainWeaponId", "MainWeaponQuantity", "CraftMaterialType1", "CraftMaterial1", "CraftMaterialQuantity1", "CraftMaterialType2", "CraftMaterial2", "CraftMaterialQuantity2", "CraftMaterialType3", "CraftMaterial3", "CraftMaterialQuantity3", "CraftMaterialType4", "CraftMaterial4", "CraftMaterialQuantity4", "CraftMaterialType5", "CraftMaterial5", "CraftMaterialQuantity5"];

function constructAPIRequest(table, fields) {
    var resultURL = baseURL + "&tables=" + table;

    resultURL += "&fields=";
    for (var i = 0; i < fields.length; ++i) {
        resultURL += fields[i] + ",+";
    }
    return resultURL;
}

function extractDataFromAPIRequest(json) {
    var cargoTable = json.cargoquery;
    var resultArray = [];
    for (var i = 0; i < cargoTable.length; ++i) {
        console.log(cargoTable[i].title.WeaponName);
        resultArray.push(cargoTable[i].title);
    }
    return resultArray;
}

function clearDisplay() {
    document.getElementById("displayarea").innerHTML = "";
}

function getWeaponData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parsedJSON = JSON.parse(xhttp.responseText);
            document.getElementById("displayarea").innerHTML = JSON.stringify(extractDataFromAPIRequest(parsedJSON), undefined, 2);
        }
    }
    xhttp.open("GET", constructAPIRequest(weaponTable, weaponFields), true);
    xhttp.send();
}

function saveWeaponData() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById("displayarea").innerHTML));
    element.setAttribute('download', "weaponData.json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}