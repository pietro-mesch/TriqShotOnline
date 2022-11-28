function Weapon(weaponClass){
    switch (weaponClass) {
        case "standard":
            return {
                v: 1000,
                projectile_life: 1};
            break;
    
        default:
            return null;
            break;
    }
}