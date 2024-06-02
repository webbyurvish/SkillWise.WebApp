using coding_mentor.Data;
using coding_mentor.Dtos;
using coding_mentor.Models;
using coding_mentor.ViewModels;
using Microsoft.EntityFrameworkCore;


namespace coding_mentor.Repositories
{
    public class MentorsRepository : IMentorsRepository
    {
        private readonly CodingDbContext _codingDbContext;
        public MentorsRepository(CodingDbContext codingDbContext)
        {
            _codingDbContext = codingDbContext;
        }

        // check is mentor exist by email
        public async Task<bool> IsExist(string Email)
        {
            return await _codingDbContext.Mentors.AnyAsync(m => m.Email == Email);
        }

        // check is mentor exist by id
        public async Task<bool> IsExist(int mentorid)
        {
            return await _codingDbContext.Mentors.AnyAsync(m => m.Id == mentorid);
        }

        // check if user exist 
        public async Task<bool> IsExistuser(string Email)
        {
            return await _codingDbContext.Users.AnyAsync(m => m.Email == Email);
        }

        public async Task<bool> DeleteMentorAsync(string email)
        {
            try
            {
                var mentor  = await _codingDbContext.Mentors.Where(m => m.Email == email).FirstOrDefaultAsync();
                var user = await _codingDbContext.Users.Where(u => u.Email == email).FirstOrDefaultAsync();

                user.Role = "user";

                _codingDbContext.Users.Update(user);
                _codingDbContext.Mentors.Remove(mentor);
                await _codingDbContext.SaveChangesAsync();

                return true;
            } catch (Exception ex)
            {
                return false;
            }
            
        }

        // add mentor
        public async Task<bool> AddMentor(MentorInput mentorInput)
        {
            // get user
            var user = await _codingDbContext.Users.Where(u => u.Email == mentorInput.Email).FirstOrDefaultAsync();

            try
            {
                // create new mentor
                var mentor = new Mentor
                {
                    Name = user.Name,
                    Email = mentorInput.Email,
                    Title = mentorInput.Title,
                    Country = mentorInput.Country,
                    Available = mentorInput.Available,
                    About = mentorInput.About,
                    ImageUrl = user.ImageUrl,
                    IsApproved = false,             
                };

                // add mentor
                _codingDbContext.Mentors.Add(mentor);
                await _codingDbContext.SaveChangesAsync();

                // get mentor id
                var mentorId = _codingDbContext.Mentors.FirstOrDefault(m => m.Email == mentor.Email).Id;

                // add all skills for mentor
                foreach (var skillId in mentorInput.SkillIds)
                {
                    var mentorSkill = new MentorSkill
                    {
                        MentorId = mentorId,
                        SkillId = skillId,
                    };

                    _codingDbContext.MentorSkills.Add(mentorSkill);
                    await _codingDbContext.SaveChangesAsync();

                }


                // add all languages for mentor
                foreach (var languageId in mentorInput.LanguageIds)
                {
                    var mentorLanguage = new MentorLanguage
                    {
                        MentorId = mentorId,
                        LanguageId = languageId,
                    
                    };

                    _codingDbContext.MentorLanguages.Add(mentorLanguage);
                    await _codingDbContext.SaveChangesAsync();
                }

              
                await _codingDbContext.SaveChangesAsync();

                return true;

            } catch (Exception ex)
                {
                   return false;
                }
        }


        // approve mentor request
        public async Task<bool> ApproveMentorRequestAsync(string email)
        {
            try
            {
                // get mentor 
                var mentor = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                        .ThenInclude(ms => ms.Skill)
                                                     .Include(m => m.MentorLanguages)
                                                         .ThenInclude(ml => ml.Language)
                                    .Where(m => m.Email == email).FirstOrDefaultAsync();

                // check if mentor is approved or not ( if true then return false )
                if (mentor.IsApproved)
                {
                    return false;
                }

                // get user
                var user = await _codingDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

                // set isapproved true
                // set user role as mentor
                mentor.IsApproved = true;
                user.Role = "mentor";

                // update user and mentor
                _codingDbContext.Update(mentor);
                _codingDbContext.Update(user);

                // save changes
                await _codingDbContext.SaveChangesAsync();
                return true;

            } catch (Exception ex)
            {
                return false;
            }
        }

        // delete mentor
        public async Task DeleteMentorRequestAsync(string email)
        {
            try
            {
                // get mentor
                var mentor  = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                        .ThenInclude(ms => ms.Skill)
                                                     .Include(m => m.MentorLanguages)
                                                         .ThenInclude(ml => ml.Language)
                                    .Where(m => m.Email == email).FirstOrDefaultAsync();

                // remove mentor
                _codingDbContext.Mentors.Remove(mentor);
                await _codingDbContext.SaveChangesAsync();

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // get all user's requests to become mentor
        public async Task<List<MentorsRequestDto>> GetMentorRequestsAsync()
        {
            try
            {
                var mentors = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                       .ThenInclude(ms => ms.Skill)
                                                    .Include(m => m.MentorLanguages)
                                                        .ThenInclude(ml => ml.Language)
                                                    .Where(m => m.IsApproved == false)
                                   .Select(m => new MentorsRequestDto()
                                   {
                                       Id = m.Id,
                                       Name = m.Name,
                                       Email = m.Email,
                                       About = m.About,
                                       Title = m.Title,
                                       Languages = m.MentorLanguages.Select(ml => ml.Language.Name).ToList(),
                                       Country = m.Country,
                                       Skills = m.MentorSkills.Select(ms => ms.Skill.Name).ToList(),
                                       Available = m.Available,
                                       ImageUrl = m.ImageUrl,
                                   }).ToListAsync();

                return mentors;

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Update mentor
        public async Task<bool> UpdateMentorAsync(UpdateMentorInput updateInput)
        {
            try
            {
                // get existing mentor details
                var existingMentor = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                           .ThenInclude(ms => ms.Skill)
                                                           .Include(m => m.MentorLanguages)
                                                           .ThenInclude(ml => ml.Language)
                                                           .FirstOrDefaultAsync(m => m.Email == updateInput.Email);
                // get existing user details
                var existingUser = await _codingDbContext.Users.FirstOrDefaultAsync(u => u.Id == updateInput.Id);

                // Update the mentor properties with the values from the updatedMentor object
                // Only update the properties if they are provided in the request
                existingMentor.Name = updateInput.Name ?? existingMentor.Name;
                existingMentor.Title = updateInput.Title ?? existingMentor.Title;
                existingMentor.About = updateInput.About ?? existingMentor.About;
                existingMentor.Country = updateInput.Country ?? existingMentor.Country;
                existingMentor.Available = updateInput.Available;
                existingUser.Name = updateInput.Name ?? existingUser.Name;


                // if skills not provided then set previous
                if (updateInput.SkillIds == null)
                {
                    existingMentor.MentorSkills = existingMentor.MentorSkills;
                }

                // Update Skills of mentor if provided
                if (updateInput.SkillIds != null)
                {
                    foreach (var skill in existingMentor.MentorSkills.ToList())
                    {
                        existingMentor.MentorSkills.Remove(skill);
                        await _codingDbContext.SaveChangesAsync();

                    }


                    foreach (var skillId in updateInput.SkillIds)
                    {
                        var mentorSkill = new MentorSkill
                        {
                            MentorId = existingMentor.Id,
                            SkillId = skillId,
                        };

                        _codingDbContext.MentorSkills.Add(mentorSkill);
                        await _codingDbContext.SaveChangesAsync();
                    }
                }


                // if languages not provided then set previous
                if (updateInput.LanguageIds == null)
                {
                    existingMentor.MentorLanguages = existingMentor.MentorLanguages;
                }

                // update mentor's languages if provided
                if (updateInput.LanguageIds != null)
                {
                    foreach (var language in existingMentor.MentorLanguages.ToList())
                    {
                        existingMentor.MentorLanguages.Remove(language);
                        await _codingDbContext.SaveChangesAsync();

                    }

                    foreach (var languageId in updateInput.LanguageIds)
                    {
                        var mentorLanguage = new MentorLanguage
                        {
                            MentorId = existingMentor.Id,
                            LanguageId = languageId,
                        };

                        _codingDbContext.MentorLanguages.Add(mentorLanguage);
                        await _codingDbContext.SaveChangesAsync();
                    }
                }

                // update all values
                _codingDbContext.Update(existingMentor);
                _codingDbContext.Update(existingUser);
                await _codingDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        // get all mentors
        public async Task<List<MentorsDto>> GetAllMentors()
        {
            try
            {
                var mentors = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                         .ThenInclude(ms => ms.Skill)
                                                      .Include(m => m.MentorLanguages)
                                                          .ThenInclude(ml => ml.Language)
                                                      .Include(m => m.Ratings)
                                                      .ThenInclude(ur => ur.Mentor)
                                                      .Where(m => m.IsApproved == true)
                                     .Select(m => new MentorsDto()
                                     {
                                         Id = m.Id,
                                         UserId = _codingDbContext.Users.Where(u => u.Email == m.Email).Select(u => u.Id).FirstOrDefault(),
                                         Name = m.Name,
                                         Email = m.Email,
                                         IsApproved = m.IsApproved,
                                         About = m.About,
                                         Title = m.Title,
                                         Languages = m.MentorLanguages.Select(ml => ml.Language.Name).ToList(),
                                         Country = m.Country,
                                         Skills = m.MentorSkills.Select(ms => ms.Skill.Name).ToList(),
                                         Available = m.Available,
                                         ImageUrl = m.ImageUrl,
                                         Likes = m.Likes.Where(l => l.MentorId == m.Id).Select(l => l.UserId).ToList(),
                                         Ratings = m.Ratings.Where(r => r.MentorId == m.Id).Select(m => new RatingDto()
                                         {
                                             user = _codingDbContext.Users.Where(u => u.Id == m.UserId).FirstOrDefault(),
                                             Stars = m.Stars,
                                             UserId = m.UserId,
                                             Comment = m.Comment,
                                             DateRated = m.DateRated
                                         }).ToList(),
                                     }).ToListAsync();

                return mentors;
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        // check if review is already exist or not
        public async Task<bool> IsReviewExist(int userId, int mentorId)
        {
            try
            {
                return await _codingDbContext.Ratings
                    .AnyAsync(r => r.UserId == userId && r.MentorId == mentorId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // add review
        public async Task AddRatingAsync(RatingInput ratingInput)
        {
            try
            {
                var mentor = await _codingDbContext.Mentors
                    .Include(m => m.Ratings)
                    .FirstOrDefaultAsync(m => m.Id == ratingInput.MentorId);

                var user = await _codingDbContext.Users.FindAsync(ratingInput.UserId);

                var rating = new Rating
                {
                    UserId = user.Id,
                    MentorId = mentor.Id,
                    Stars = ratingInput.stars,
                    Comment = ratingInput.Comment,
                    DateRated = DateTime.Now
                };

                 mentor.Ratings.Add(rating);

                await _codingDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        // get filtered mentors
        public async Task<PaginationResult<MentorsDto>> GetFilteredMentorsAsync(List<MentorsDto> mentors,
                                                                                string technology,
                                                                                string country,
                                                                                string name,
                                                                                string spokenlanguage,
                                                                                int pageNumber,
                                                                                int pageSize,
                                                                                bool isLiked ,
                                                                                int userId)
        {
            try
            {
                var filteredMentors = mentors;

                // check for technology
                if (!string.IsNullOrEmpty(technology))
                    filteredMentors = filteredMentors.Where(mentor => mentor.Skills.Any(skill => skill.ToLower().Contains(technology.ToLower()))).ToList();

                // check for country
                if (!string.IsNullOrEmpty(country))
                    filteredMentors = filteredMentors.Where(mentor => mentor.Country.ToLower().Contains(country.ToLower())).ToList();

                // check for name
                if (!string.IsNullOrEmpty(name))
                    filteredMentors = filteredMentors.Where(mentor => mentor.Name.ToLower().Contains(name.ToLower())).ToList();

                // check for spokenlanaguage
                if (!string.IsNullOrEmpty(spokenlanguage))
                    filteredMentors = filteredMentors.Where(mentor => mentor.Languages.Any(language => language.ToLower().Contains(spokenlanguage.ToLower()))).ToList();

                // check for favourites
                if (isLiked)
                    filteredMentors = filteredMentors.Where(mentor => mentor.Likes.Any(l => l == userId)).ToList();

                // filtered mentors
                var totalItems = filteredMentors.Count();

                // paginated mentors
                var paginatedMentors = filteredMentors.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

                // return pagination result
                var paginationResult = new PaginationResult<MentorsDto>
                {
                    Items = paginatedMentors,
                    TotalItems = totalItems,
                    CurrentPage = pageNumber,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling((double)totalItems / pageSize)
                };

                return paginationResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Get mentor by id
        public async Task<Mentor> GetMentorById(int id)
        {
            try
            {
                return await _codingDbContext.Mentors.FirstOrDefaultAsync(u => u.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<MentorsDto> GetMentorByIdAsync(int id)
        {
            try
            {

                var mentor = _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                         .ThenInclude(ms => ms.Skill)
                                                      .Include(m => m.MentorLanguages)
                                                          .ThenInclude(ml => ml.Language)
                                                     .Include(m => m.Ratings)
                                                      .ThenInclude(ur => ur.Mentor)
                                     .Where(m => m.Id == id).Select(m => new MentorsDto()
                                     {
                                         Id = m.Id,
                                         UserId = _codingDbContext.Users.Where(u => u.Email == m.Email).Select(u => u.Id).FirstOrDefault(),
                                         Name = m.Name,
                                         Email = m.Email,
                                         About = m.About,
                                         Title = m.Title,
                                         Languages = m.MentorLanguages.Select(ml => ml.Language.Name).ToList(),
                                         Country = m.Country,
                                         Skills = m.MentorSkills.Select(ms => ms.Skill.Name).ToList(),
                                         Available = m.Available,
                                         ImageUrl = m.ImageUrl,
                                         Likes = m.Likes.Where(l => l.MentorId == id).Select(l => l.UserId).ToList(),
                                         Ratings = m.Ratings.Where(r => r.MentorId == m.Id).Select(m => new RatingDto()
                                         {
                                             user = _codingDbContext.Users.Where(u => u.Id == m.UserId).FirstOrDefault(),
                                             Stars = m.Stars,
                                             UserId = m.UserId,
                                             Comment = m.Comment,
                                             DateRated = m.DateRated
                                         }).ToList(),   
                                     }).FirstOrDefault();
             
                return mentor;

            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<MentorsDto> GetMentorByEmailAsync(string email)
        {
            try
            {

                var mentor = await _codingDbContext.Mentors.Include(m => m.MentorSkills)
                                                         .ThenInclude(ms => ms.Skill)
                                                      .Include(m => m.MentorLanguages)
                                                          .ThenInclude(ml => ml.Language)
                                                     .Include(m => m.Ratings)
                                                     .ThenInclude(r => r.Mentor)
                                     .Where(m => m.Email == email).Select(m => new MentorsDto()
                                     {
                                         Id = m.Id,
                                         Name = m.Name,
                                         Email = m.Email,
                                         About = m.About,
                                         Title = m.Title,
                                         Languages = m.MentorLanguages.Select(ml => ml.Language.Name).ToList(),
                                         Country = m.Country,
                                         Skills = m.MentorSkills.Select(ms => ms.Skill.Name).ToList(),
                                         Available = m.Available,
                                         ImageUrl = m.ImageUrl,
                                         Likes = m.Likes.Where(l => l.MentorId == m.Id).Select(l => l.UserId).ToList(),
                                         Ratings = m.Ratings.Where(r => r.MentorId == m.Id).Select(m => new RatingDto()
                                         {
                                             user = _codingDbContext.Users.Where(u => u.Id == m.UserId).FirstOrDefault(),
                                             Stars = m.Stars,
                                             UserId = m.UserId,
                                             Comment = m.Comment,
                                             DateRated = m.DateRated
                                         }).ToList(),
                                     }).FirstOrDefaultAsync();

                return mentor;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // get all countries
        public async Task<List<Country>> GetCountriesAsync()
        {
            var countries = await _codingDbContext.Countries.Select(c => new Country()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();

            return countries;
        }

        // get all languages
        public async Task<List<LanguageDto>> GetLanguagesAsync()
        {
            var languages = await _codingDbContext.Languages.Select(c => new LanguageDto()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();

            return languages;
        }

        // get all skills
        public async Task<List<SkillDto>> GetSkillsAsync()
        {
            var skills = await _codingDbContext.Skills.Select(c => new SkillDto()
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();

            return skills;
        }
    }
}
