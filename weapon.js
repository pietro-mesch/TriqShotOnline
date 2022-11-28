function Weapon(weaponClass){
    switch (weaponClass) {
        case "standard":
            return {
                v: 1000,
                projectile_life: 10};
            break;
    
        default:
            return null;
            break;
    }
}