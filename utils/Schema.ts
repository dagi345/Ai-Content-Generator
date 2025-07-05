import { serial , pgTable, varchar, text } from "drizzle-orm/pg-core";

export const Aioutput= pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData:varchar('formData').notNull(),
    airesponse: text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt:varchar('createdAt')
})