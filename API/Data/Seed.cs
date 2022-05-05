using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        //  public static async Task SeedUsers(DataContext context)
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            // if (await context.Users.AnyAsync()) return;
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            //var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name= "Member"},
                new AppRole{Name= "Admin"},
                new AppRole{Name= "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                // using var hmac = new HMACSHA512();

                user.Photos.First().IsApproved = true;
                user.UserName = user.UserName.ToLower();
                // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                // user.PasswordSalt = hmac.Key;

                // await context.Users.AddAsync(user);

                await userManager.CreateAsync(user, "Lmkr123");
                await userManager.AddToRoleAsync(user, "Member");

            }

            var admin = new AppUser
            {
                UserName = "admin",
                KnownAs = "admin"
            };

            await userManager.CreateAsync(admin, "Lmkr123");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });

            // await context.SaveChangesAsync();
        }

    }
}