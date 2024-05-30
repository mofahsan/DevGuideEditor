"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedNames = exports.initRegistry = void 0;
var AttributesFolderTypeEditable_1 = require("./ComponentType/AttributeType/AttributesFolderTypeEditable");
var ComponentsFolderTypeEditable_1 = require("./ComponentType/ComponentsFolderTypeEditable");
var EditableRegistry_1 = require("./EditableRegistry");
var AttributeRow_1 = require("./ComponentType/AttributeType/AttributeRow");
var enumFileType_1 = require("./ComponentType/enumType/enumFileType");
var enumFolderType_1 = require("./ComponentType/enumType/enumFolderType");
var tagsFolderType_1 = require("./ComponentType/tagType/tagsFolderType");
var tagFileType_1 = require("./ComponentType/tagType/tagFileType");
var flowFolderType_1 = require("./ComponentType/flowType/flowFolderType");
var flowFileType_1 = require("./ComponentType/flowType/flowFileType");
var exampleFolderType_1 = require("./ComponentType/examplesType/exampleFolderType");
var ExampleDomainFolderType_1 = require("./ComponentType/examplesType/ExampleDomainFolderType");
function initRegistry() {
    EditableRegistry_1.EditableRegistry.register(ComponentsFolderTypeEditable_1.ComponentsType);
    EditableRegistry_1.EditableRegistry.register(AttributesFolderTypeEditable_1.AttributesFolderTypeEditable); // main folder structure
    EditableRegistry_1.EditableRegistry.register(AttributeRow_1.AttributeFile); // files inside that folder
    EditableRegistry_1.EditableRegistry.register(enumFileType_1.EnumFileType);
    EditableRegistry_1.EditableRegistry.register(enumFolderType_1.EnumFolderType);
    EditableRegistry_1.EditableRegistry.register(tagsFolderType_1.TagsFolderType);
    EditableRegistry_1.EditableRegistry.register(tagFileType_1.TagFileType);
    EditableRegistry_1.EditableRegistry.register(flowFolderType_1.FlowFolderType);
    EditableRegistry_1.EditableRegistry.register(flowFileType_1.FlowFileType);
    EditableRegistry_1.EditableRegistry.register(exampleFolderType_1.ExampleFolderType);
    EditableRegistry_1.EditableRegistry.register(ExampleDomainFolderType_1.ExampleDomainFolderType);
}
exports.initRegistry = initRegistry;
exports.FixedNames = {
    ATTRIBUTES_FOLDER: "attributes",
};
