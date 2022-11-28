function Weapon(weaponClass){
    switch (weaponClass) {
        case "standard":
            return {
                v: 1000,
                projectile_life: 100};
            break;
    
        default:
            return null;
            break;
    }
}