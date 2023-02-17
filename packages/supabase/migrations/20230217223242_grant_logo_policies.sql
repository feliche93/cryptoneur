create policy "Enable insert for authenticated users only"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "storage"."objects"
as permissive
for select
to public
using (true);



