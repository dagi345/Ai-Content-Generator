import { integer, timestamp } from "drizzle-orm/pg-core";
import { serial , pgTable, varchar, text, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const Aioutput= pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    formData:varchar('formData').notNull(),
    airesponse: text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt:varchar('createdAt')
});


export const subscriptions= pgTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  customerId: varchar('customerId', { length: 255 }).notNull(),
  userEmail: varchar('userEmail', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  priceAmount: integer('priceAmount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  subscriptionType: varchar('subscriptionType', { length: 20 }).notNull(),
  currentPeriodStart: varchar('currentPeriodStart', { length: 255 }).notNull(),
  currentPeriodEnd: varchar('currentPeriodEnd', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).notNull(),
}, (subscriptions) => ({
  customerIdIndex: uniqueIndex("customer_idx").on(subscriptions.customerId)
}));


// utils/Schema.ts
export const usages = pgTable("usages", {
  id: serial("id").primaryKey(),
  customerId: text("customerId").notNull(),
  usageCount: integer("usageCount").default(0),
});

