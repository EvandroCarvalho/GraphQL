import { ModelsInterface } from "./ModelsInterface";

export interface BaseModelsInterface{

    prototype?;
    associate?(models: ModelsInterface) : void;

}