create policy "Enable insert for authenticated users only"
on "public"."grant_blockchains"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."grant_categories"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."grant_use_cases"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."grants"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update for authenticated users"
on "public"."grants"
as permissive
for update
to authenticated
using (true)
with check (true);



