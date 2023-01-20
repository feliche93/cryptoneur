alter table "public"."grants" enable row level security;

create policy "Enable read access for all users"
on "public"."blockchains"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."categories"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."fiats"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."grant_blockchains"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."grant_categories"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."grant_use_cases"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."grants"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."use_cases"
as permissive
for select
to public
using (true);



