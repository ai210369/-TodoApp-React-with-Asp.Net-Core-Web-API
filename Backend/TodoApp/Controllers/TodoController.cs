using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext appDbContext;

        public TodoController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

    [HttpPost]
        public async Task<ActionResult<List<TodoItem>>> AddTask(TodoItem newItem)
        {
            if (newItem == null)
            {
                return BadRequest("Object Instance Not Set.");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                              .Select(e => e.ErrorMessage)
                                              .ToList();
                return BadRequest(new { messages = errors });
            }

                appDbContext.TodoItems.Add(newItem);
                await appDbContext.SaveChangesAsync();
                return Ok(await appDbContext.TodoItems.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoItem>>> GetAllItems()
        {
            var items = await appDbContext.TodoItems.ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TodoItem>> GetItemById(int id)
        {
            var item = await appDbContext.TodoItems.FirstOrDefaultAsync(e => e.Id == id);
            if (item != null)
            {
                return Ok(item);
            }
            return NotFound("Data is Not Found");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItem>> UpdateItem(int id, TodoItem updatedItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (updatedItem != null)
            {
                var item = await appDbContext.TodoItems.FirstOrDefaultAsync(e => e.Id == updatedItem.Id);
                item!.Title = updatedItem.Title;
                item!.Description = updatedItem.Description;
                item!.IsCompleted = updatedItem.IsCompleted;
                await appDbContext.SaveChangesAsync();
                return Ok(item);
            }
            return BadRequest("Task Not Found");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TodoItem>>> DeleteItem(int id)
        {
            var item = await appDbContext.TodoItems.FirstOrDefaultAsync(e => e.Id == id);
            if(item != null)
            {
                appDbContext.TodoItems.Remove(item);
                await appDbContext.SaveChangesAsync();
                return Ok(await appDbContext.TodoItems.ToListAsync());
            }
            return NotFound();
        }
    }
}
