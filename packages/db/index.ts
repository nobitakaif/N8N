
import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

const EdgeSchema = new Schema({
    id : { type : String, required : true}, 
    source : {type : String, required :true},
    target : {type : String, required :true}
}, {
    _id : false // this will not generate automatic _id 
})

const PositionSchema = new Schema({
    x : { type : Number, required :  true},
    y : { type : Number, required : true}
},{
    _id : false
})

const NodeDataSchema = new Schema({
    kind : { type : String, enum : ['ACTION' , 'TRIGGER']},
    metadata : Schema.Types.Mixed
}, { _id : false })

const NodeWorkflowSchema = new Schema({
    id : {type : String, required : true},
    nodeId : { type : mongoose.Types.ObjectId, ref : 'Nodes'},
    data : NodeDataSchema, // Schema.Types.Mixed => any type 
    position : PositionSchema,
    credentials : Schema.Types.Mixed
}, {
    _id : false
})

const WorkflowSchema = new Schema({
    userId : { type : mongoose.Types.ObjectId, required : true, ref : 'Users'},
    nodes : [NodeWorkflowSchema],
    edges : [EdgeSchema]
})

const CredentialsTypeSchema = new Schema({
    title : { type : String, required : true},
    required : { type : Boolean, required : true}
})

const NodeSchema  = new Schema({
    title : { type : String, required : true},
    description : { type : String, required : true},
    type : { type : String, enum : ['ACTION', 'TRIGGER'], requied : true},
    credentialsType : [CredentialsTypeSchema],
})

const ExecutionSchema = new Schema({
    workflowId : { type : mongoose.Types.ObjectId, required : true, ref : 'Workflows'},
    status : { type : String, enum : ['PENDING', 'SUCCESS', 'FAILURE']},
    statTime : {type : Date, default : Date.now(), required : true},
    endTime : { type : Date}
})

export const UserModel = mongoose.model("Users", UserSchema)
export const WorkflowModel = mongoose.model('Workflows', WorkflowSchema)
export const NodeModel = mongoose.model('Node', NodeSchema)
export const ExecutionModel = mongoose.model('Executions', ExecutionSchema)