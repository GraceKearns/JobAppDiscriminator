import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('JobApplication')
    .addColumn('jobId', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('jobTitle', 'text', (col) => col.notNull())
    .addColumn('jobCompany', 'text', (col) => col.notNull())
    .addColumn('jobAppliedAt', 'datetime', (col) => 
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('jobUpdatedAt', 'datetime')
    .addColumn('jobStatus', 'text', (col) => 
      col.notNull().check(sql`jobStatus IN ('applied', 'rejected', 'accepted')`)
    )
    .addColumn('jobNotes', 'text', (col) => col.notNull().defaultTo(''))
    .execute()

  await db.schema
    .createIndex('job_application_status_index')
    .on('JobApplication')
    .column('jobStatus')
    .execute()

  await db.schema
    .createIndex('job_application_company_index')
    .on('JobApplication')
    .column('jobCompany')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('JobApplication').execute()
}