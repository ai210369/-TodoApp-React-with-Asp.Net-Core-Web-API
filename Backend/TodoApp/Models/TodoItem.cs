using System.ComponentModel.DataAnnotations;

namespace TodoApp.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title cannot be empty.")]
        [MaxLength(10, ErrorMessage = "Title cannot over 10 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description cannot be empty.")]
        [MaxLength(10, ErrorMessage = "Description cannot over 10 characters.")]
        public string Description { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }
    }
}
