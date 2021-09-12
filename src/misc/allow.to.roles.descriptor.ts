import { SetMetadata } from "@nestjs/common"

export const AlloweRoles = (...roles: ("administrator"|"user")[]) => {
    return SetMetadata('allow_to_roles', roles);
}