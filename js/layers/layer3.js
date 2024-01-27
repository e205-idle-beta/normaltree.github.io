addLayer("cP", {
    name: "community prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "cP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
                points: new Decimal(0),
    }},
    color: "#aeD573",
    requires(){ 
        let requirement = new Decimal(20)
        if (hasUpgrade('cP', 12)) requirement = requirement.div(2.5)
        return requirement
    },
    resource: "community prestige points", // Name of prestige currency
    baseResource: "buffed prestige points", // Name of resource prestige is based on
    baseAmount() {return player.bP.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        let eff = (player.cP.points.add(1)).pow(0.34)
        return eff
    },
    effectDescription() {
        dis = "which boosts Buffed Prestige Point gain by "+format(tmp.cP.effect)+"x"
        return dis
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for community prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('bP', 13) || player.cP.unlocked},
        milestones: {
        11: {
            requirementDescription: "1 Community Prestige Points",
            effectDescription: `Keep Prestige Content on reset`,
            done() { return player.cP.points.gte(1) },
        },
        12: {
            requirementDescription: "5 Community Prestige Points",
            effectDescription: `Triple Prestige Points`,
            done() { return player.cP.points.gte(5) },
        },
    },
    upgrades: {
        11: {
            title: "Community Modern",
            description: "Double Buffed Prestige point gain",
            cost: new Decimal(2),
        },
        12: {
            title: "Community Normality",
            description: "/2.5 Community Prestige Point requirement",
            cost: new Decimal(6),
            unlocked(){ return hasUpgrade('cP', 11) },
        },
        13: {
            title: "Community Difference",
            description: "ten-fold Buffed Prestige Point gain",
            cost: new Decimal(10),
            unlocked(){ return hasUpgrade('cP', 12) },
        },
    },
})