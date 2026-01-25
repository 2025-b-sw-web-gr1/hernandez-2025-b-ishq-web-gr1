export class CreatePlayerDto {
  name: string;
  position: string;
  teamId: number;
}

export class UpdatePlayerDto {
  name?: string;
  position?: string;
  teamId?: number;
}
