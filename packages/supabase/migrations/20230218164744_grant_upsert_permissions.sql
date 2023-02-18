create policy "Enable delete for authenticated users only"
on "public"."grant_blockchains"
as permissive
for delete
to authenticated
using (true);


create policy "Enable delete for authenticated users only"
on "public"."grant_categories"
as permissive
for delete
to authenticated
using (true);


create policy "Enable delete for users based on user_id"
on "public"."grant_use_cases"
as permissive
for delete
to authenticated
using (true);



